import { Test, TestingModule } from '@nestjs/testing';
import { CursusResponsiblesController } from './cursus-responsibles.controller';
import { CursusResponsiblesService } from './cursus-responsibles.service';

describe('CursusResponsiblesController', () => {
  let controller: CursusResponsiblesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CursusResponsiblesController],
      providers: [CursusResponsiblesService],
    }).compile();

    controller = module.get<CursusResponsiblesController>(
      CursusResponsiblesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
