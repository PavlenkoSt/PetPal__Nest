import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';

import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { Public } from 'src/decorators/public.decorator';

import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('/register')
  create(@Body() registerDto: RegisterDTO) {
    return this.authService.register(registerDto);
  }
}
