import { Test, TestingModule } from '@nestjs/testing';
import { MedicationHistoryService } from './medication-history.service';

describe('MedicationHistoryService', () => {
  let service: MedicationHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicationHistoryService],
    }).compile();

    service = module.get<MedicationHistoryService>(MedicationHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
