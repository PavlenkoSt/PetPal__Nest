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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { Public } from 'src/decorators/public.decorator';

import { AuthService } from './auth.service';
import { ICurrentUser, User } from 'src/decorators/user.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthResponses } from './auth.responses';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatusCode.Ok)
  @ApiBody({ type: UserLoginDto })
  @AuthResponses.login
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
