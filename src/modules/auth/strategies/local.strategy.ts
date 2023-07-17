import { PassportStrategy } from '@nestjs/passport';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';
import { INVALID_CREDENTIALS } from '../auth.contants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'login',
    });
  }

  async validate(login: string, password: string) {
    const user = await this.authService.validateUser(login, password);

    if (!user) {
      throw new UnauthorizedException({ message: INVALID_CREDENTIALS });
    }

    return user;
  }
}
