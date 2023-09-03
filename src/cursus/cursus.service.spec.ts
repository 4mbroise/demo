import { Test, TestingModule } from '@nestjs/testing';
import { CursusService } from './cursus.service';

describe('CursusService', () => {
  let service: CursusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CursusService],
    }).compile();

    service = module.get<CursusService>(CursusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
