import { Test, TestingModule } from '@nestjs/testing';
import { PetsHealthService } from './pets-health.service';

describe('PetsHealthService', () => {
  let service: PetsHealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetsHealthService],
    }).compile();

    service = module.get<PetsHealthService>(PetsHealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
