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

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfig,
    }),
    UsersModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [JwtBlacklistService, AuthService, LocalStrategy, JWTStrategy],
})
export class AuthModule {}
