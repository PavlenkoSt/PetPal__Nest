import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { comparePassword } from './util/password-hash.util';
import { UsersService } from '../users/users.service';
import { ICurrentUser } from 'src/decorators/user.decorator';
import { mongoParseObject } from 'src/db/mongo-parse-object.util';
import { JwtBlacklistService } from '../jwt-blacklist/jwt-blacklist.service';
import { IDecodedToken } from 'src/interfaces/IDecodedToken';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ITokenPayload } from './auth.interfaces';
import { RefreshTokensService } from '../refresh-tokens/refresh-tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly jwtBlacklistService: JwtBlacklistService,
    private readonly configService: ConfigService,
    private readonly refreshTokensService: RefreshTokensService,
  ) {}

  async validateUser(login: string, pass: string) {
    const user = await this.usersService.findOneByLogin(login);

    if (!user) return null;

    const { passwordHash, ...rest } = mongoParseObject(user);

    const isPasswordValid = await comparePassword(pass, passwordHash);

    if (!isPasswordValid) return null;

    return rest;
  }

  async login(user: ICurrentUser) {
    const payload: ITokenPayload = { username: user.login, sub: user.id };

    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    const decodedToken = this.jwtService.decode(refresh_token) as IDecodedToken;

    this.refreshTokensService.add({
      token: refresh_token,
      userId: String(user.id),
      expiresAt: new Date(decodedToken.exp * 1000),
    });

    const { pets, ...restUserFields } = user;

    return {
      access_token,
      refresh_token,
      user: restUserFields,
    };
  }

  async getUserFromAuthenticationToken(token: string) {
    const veryfied = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_SECRET'),
    });

    if (!veryfied) throw new UnauthorizedException();

    const decoded = this.jwtService.decode(token) as IDecodedToken;

    if (!decoded) throw new UnauthorizedException();

    const { sub } = decoded;

    const user = await this.usersService.findOneById(String(sub));

    if (!user) throw new UnauthorizedException();

    return user;
  }

  async register(registerDto: CreateUserDto) {
    const user = await this.usersService.create(registerDto);

    return await this.login({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      login: user.login,
      pets: user.pets,
    });
  }

  async logout(token: string, refreshToken: string) {
    const decoded = this.jwtService.decode(refreshToken) as IDecodedToken;

    if (decoded) {
      this.refreshTokensService.delete({
        token: refreshToken,
        userId: decoded.sub,
      });
    }

    this.jwtBlacklistService.addToBlacklistAccessToken(token);
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) throw new UnauthorizedException();

    const refreshTokenFromDB = await this.refreshTokensService.get(
      refreshToken,
    );

    if (!refreshTokenFromDB) throw new UnauthorizedException();

    const decoded = this.jwtService.decode(
      refreshTokenFromDB.token,
    ) as IDecodedToken;

    if (!decoded || !decoded.exp) throw new UnauthorizedException();

    const expirationDate = new Date(decoded.exp * 1000);

    const now = new Date();

    if (now >= expirationDate) throw new UnauthorizedException();

    const user = await this.usersService.findOneById(decoded.sub);

    if (!user) throw new UnauthorizedException();

    this.refreshTokensService.delete({
      token: refreshToken,
      userId: decoded.sub,
    });

    return await this.login(user);
  }
}
