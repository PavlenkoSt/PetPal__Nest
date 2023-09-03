import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RefreshTokensService } from './refresh-tokens.service';
import { RefreshTokensRepository } from './refresh-tokens.repository';
import {
  RefreshToken,
  RefreshTokenSchema,
} from './schemas/refresht-tokens.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RefreshToken.name,
        schema: RefreshTokenSchema,
      },
    ]),
  ],
  providers: [RefreshTokensService, RefreshTokensRepository],
  exports: [RefreshTokensService],
})
export class RefreshTokensModule {}
