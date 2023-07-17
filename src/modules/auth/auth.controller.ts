import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';

import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @Post('/register')
  create(@Body() registerDto: RegisterDTO) {
    return this.authService.register(registerDto);
  }
}
