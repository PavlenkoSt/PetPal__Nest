import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';

import configuration from './config/configuration';
import { validate } from './config/configuration.validate';
import { mongooseConnectionFactory } from './db/mongoose.factory';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { S3LoggerService } from './aws/s3-logger.service';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PetsModule } from './modules/pets/pets.module';
import { JwtBlacklistModule } from './modules/jwt-blacklist/jwt-blacklist.module';
import { JwtBlacklistService } from './modules/jwt-blacklist/jwt-blacklist.service';
import { ErrorLogsModule } from './modules/error-logs/error-logs.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { MedicationsModule } from './modules/medications/medications.module';
import { VaccinationsModule } from './modules/vaccinations/vaccinations.module';
import { AllergiesModule } from './modules/allergies/allergies.module';

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
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    AuthModule,
    UsersModule,
    PetsModule,
    JwtBlacklistModule,
    ErrorLogsModule,
    HealthCheckModule,
    MedicationsModule,
    VaccinationsModule,
    AllergiesModule,
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
