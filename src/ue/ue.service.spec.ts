import { Test, TestingModule } from '@nestjs/testing';
import { UeService } from './ue.service';

describe('UeService', () => {
  let service: UeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UeService],
    }).compile();

    service = module.get<UeService>(UeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
