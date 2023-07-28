import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PetsModule } from './modules/pets/pets.module';
import { PetsHealthModule } from './modules/pets-health/pets-health.module';
import { PetsMediaModule } from './modules/pets-media/pets-media.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PetsModule,
    PetsHealthModule,
    PetsMediaModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
