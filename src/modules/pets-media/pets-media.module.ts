import { Module } from '@nestjs/common';
import { PetsMediaService } from './pets-media.service';
import { PetsMediaController } from './pets-media.controller';

@Module({
  controllers: [PetsMediaController],
  providers: [PetsMediaService]
})
export class PetsMediaModule {}
