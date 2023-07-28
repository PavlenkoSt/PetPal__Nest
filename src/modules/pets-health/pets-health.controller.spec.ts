import { Test, TestingModule } from '@nestjs/testing';
import { PetsHealthController } from './pets-health.controller';
import { PetsHealthService } from './pets-health.service';

describe('PetsHealthController', () => {
  let controller: PetsHealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetsHealthController],
      providers: [PetsHealthService],
    }).compile();

    controller = module.get<PetsHealthController>(PetsHealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
