import {
  Controller,
  Post,
  Body,
  UseGuards,
  Res,
  Headers,
  HttpCode,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { Public } from 'src/decorators/public.decorator';

import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { ICurrentUser, User } from 'src/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('/login')
  async login(
    @User() user: ICurrentUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refresh_token, ...rest } = await this.authService.login(user);

    response.cookie('refresh_token', refresh_token, { httpOnly: true });

    return rest;
  }

  @Public()
  @Post('/register')
  create(@Body() registerDto: RegisterDTO) {
    return this.authService.register(registerDto);
  }

  @Public()
  @HttpCode(200)
  @Post('/refresh-token')
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refresh_token, ...rest } = await this.authService.refreshToken(
      request.cookies.refresh_token,
    );

    response.cookie('refresh_token', refresh_token, { httpOnly: true });

    return rest;
  }

  @Post('/logout')
  @HttpCode(200)
  logout(
    @Headers() headers: { authorization: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = headers?.authorization?.split(' ')?.[1];

    response.clearCookie('refresh_token');
    return this.authService.logout(token);
  }
}
