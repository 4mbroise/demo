import { Test, TestingModule } from '@nestjs/testing';
import { CursusController } from './cursus.controller';
import { CursusService } from './cursus.service';

describe('CursusController', () => {
  let controller: CursusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CursusController],
      providers: [CursusService],
    }).compile();

    controller = module.get<CursusController>(CursusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
