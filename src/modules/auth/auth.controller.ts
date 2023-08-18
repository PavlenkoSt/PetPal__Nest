import {
  Controller,
  Post,
  Body,
  UseGuards,
  Res,
  Headers,
  HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { ThrottlerGuard } from '@nestjs/throttler';

import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { Public } from 'src/decorators/public.decorator';
import { Cookie } from 'src/decorators/cookie.decorator';

import { AuthService } from './auth.service';
import { ICurrentUser, User } from 'src/decorators/user.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthResponses } from './auth.responses';
import { REFRESH_TOKEN_COOKIE } from './auth.contants';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatusCode.Ok)
  @ApiBody({ type: UserLoginDto })
  @AuthResponses.login
  @Post('/login')
  async login(
    @User() user: ICurrentUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refresh_token, ...rest } = await this.authService.login(user);

    response.cookie(REFRESH_TOKEN_COOKIE, refresh_token, { httpOnly: true });

    return rest;
  }

  @Public()
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatusCode.Ok)
  @AuthResponses.login
  @Post('/register')
  create(@Body() registerDto: CreateUserDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @HttpCode(HttpStatusCode.Ok)
  @AuthResponses.login
  @Post('/refresh-token')
  async refreshToken(
    @Cookie(REFRESH_TOKEN_COOKIE) refreshTokenCookie,
    @Res({ passthrough: true })
    response: Response,
  ) {
    const { refresh_token, ...rest } = await this.authService.refreshToken(
      refreshTokenCookie,
    );

    response.cookie(REFRESH_TOKEN_COOKIE, refresh_token, { httpOnly: true });

    return rest;
  }

  @Post('/logout')
  @HttpCode(HttpStatusCode.Ok)
  @ApiBearerAuth()
  logout(
    @Headers() headers: { authorization: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = headers?.authorization?.split(' ')?.[1];

    response.clearCookie('refresh_token');
    return this.authService.logout(token);
  }
}
