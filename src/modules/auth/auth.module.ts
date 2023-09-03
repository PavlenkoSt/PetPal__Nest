import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JWTStrategy } from './strategies/jwt.strategy';
import { JwtConfig } from './jwt/jwt.config';
import { JwtBlacklistService } from '../jwt-blacklist/jwt-blacklist.service';
import { RefreshTokensModule } from '../refresh-tokens/refresh-tokens.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfig,
    }),
    UsersModule,
    PassportModule,
    RefreshTokensModule,
  ],
  controllers: [AuthController],
  providers: [JwtBlacklistService, AuthService, LocalStrategy, JWTStrategy],
  exports: [AuthService],
})
export class AuthModule {}
