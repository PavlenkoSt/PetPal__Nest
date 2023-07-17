import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginDto: LoginDTO) {
    console.log('====================================');
    console.log('loginDto', loginDto);
    console.log('====================================');
    return this.authService.login(loginDto);
  }

  @Post('/register')
  create(@Body() registerDto: RegisterDTO) {
    return this.authService.register(registerDto);
  }
}
