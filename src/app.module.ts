import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
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
import { ErrorLogsModule } from './modules/error-logs/error-logs.module';
import { VaccinationsModule } from './modules/vaccinations/vaccinations.module';
import { AllergiesModule } from './modules/allergies/allergies.module';
import { SystemHealthCheckModule } from './modules/system-health-check/system-health-check.module';
import { VetVisitModule } from './modules/vet-visit/vet-visit.module';
import { MedicationHistoryModule } from './modules/medication-history/medication-history.module';
import { CertificatesModule } from './modules/certificates/certificates.module';
import { ChatsModule } from './modules/chats/chats.module';
import { ChatMessagesModule } from './modules/chat-messages/chat-messages.module';
import { RefreshTokensModule } from './modules/refresh-tokens/refresh-tokens.module';

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
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    PetsModule,
    JwtBlacklistModule,
    ErrorLogsModule,
    SystemHealthCheckModule,
    VaccinationsModule,
    AllergiesModule,
    VetVisitModule,
    MedicationHistoryModule,
    CertificatesModule,
    ChatsModule,
    ChatMessagesModule,
    RefreshTokensModule,
  ],
  providers: [
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
