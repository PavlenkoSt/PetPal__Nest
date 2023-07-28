import { Test, TestingModule } from '@nestjs/testing';
import { PetsMediaController } from './pets-media.controller';
import { PetsMediaService } from './pets-media.service';

describe('PetsMediaController', () => {
  let controller: PetsMediaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetsMediaController],
      providers: [PetsMediaService],
    }).compile();

    controller = module.get<PetsMediaController>(PetsMediaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
