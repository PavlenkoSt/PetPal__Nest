import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string) {
    const user = await this.usersService.findOneByLogin(login);

    if (!user) return null;

    const { passwordHash, ...rest } = user;

    if (passwordHash !== pass) return null;

    return rest;
  }

  async login(user: LoginDTO) {
    const payload = { username: user.login, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto: RegisterDTO) {
    return 'register';
  }
}
