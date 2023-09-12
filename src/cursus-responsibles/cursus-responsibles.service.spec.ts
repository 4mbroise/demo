import { Test, TestingModule } from '@nestjs/testing';
import { CursusResponsiblesService } from './cursus-responsibles.service';

describe('CursusResponsiblesService', () => {
  let service: CursusResponsiblesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CursusResponsiblesService],
    }).compile();

    service = module.get<CursusResponsiblesService>(CursusResponsiblesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
