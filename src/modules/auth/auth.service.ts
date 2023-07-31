import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { comparePassword } from './util/password-hash.util';
import { UsersService } from '../users/users.service';
import { RegisterDTO } from './dto/register.dto';
import { ICurrentUser } from 'src/decorators/user.decorator';
import { mongoParseObject } from 'src/db/mongo-parse-object.util';
import { JwtBlacklistService } from '../jwt-blacklist/jwt-blacklist.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly jwtBlacklistService: JwtBlacklistService,
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
    const payload = { username: user.login, sub: user.id };

    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async register(registerDto: RegisterDTO) {
    const user = await this.usersService.create(registerDto);

    return await this.login({ login: user.login, id: user.id });
  }

  async logout(token: string) {
    this.jwtBlacklistService.addToBlacklistAccessToken(token);
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) throw new UnauthorizedException();

    const decoded = this.jwtService.decode(refreshToken);

    if (!decoded) throw new UnauthorizedException();

    const user = await this.usersService.findOneById(decoded.sub);

    if (!user) throw new UnauthorizedException();

    return await this.login(user);
  }
}
