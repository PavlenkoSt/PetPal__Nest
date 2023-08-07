import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';

import configuration from './config/configuration';
import { validate } from './config/configuration.validate';
import { mongooseConnectionFactory } from './db/mongoose.factory';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { S3LoggerService } from './aws/s3-logger.service';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PetsModule } from './modules/pets/pets.module';
import { PetsHealthModule } from './modules/pets-health/pets-health.module';
import { PetsMediaModule } from './modules/pets-media/pets-media.module';
import { JwtBlacklistModule } from './modules/jwt-blacklist/jwt-blacklist.module';
import { JwtBlacklistService } from './modules/jwt-blacklist/jwt-blacklist.service';
import { ErrorLogsModule } from './modules/error-logs/error-logs.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
      validate,
    }),
    MongooseModule.forRootAsync({
      useFactory: mongooseConnectionFactory,
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    PetsModule,
    PetsHealthModule,
    PetsMediaModule,
    JwtBlacklistModule,
    ErrorLogsModule,
    HealthCheckModule,
  ],
  providers: [
    JwtBlacklistService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    S3LoggerService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
