import { Test, TestingModule } from '@nestjs/testing';
import { PetsMediaService } from './pets-media.service';

describe('PetsMediaService', () => {
  let service: PetsMediaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetsMediaService],
    }).compile();

    service = module.get<PetsMediaService>(PetsMediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
