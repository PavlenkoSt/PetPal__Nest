import { Test, TestingModule } from '@nestjs/testing';

import { VetVisitService } from './vet-visit.service';

describe('VetVisitService', () => {
  let service: VetVisitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VetVisitService],
    }).compile();

    service = module.get<VetVisitService>(VetVisitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
