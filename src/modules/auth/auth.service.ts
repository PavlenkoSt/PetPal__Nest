import { Injectable } from '@nestjs/common';

import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  login(loginDto: LoginDTO) {
    return 'login';
  }

  register(registerDto: RegisterDTO) {
    return 'register';
  }
}
