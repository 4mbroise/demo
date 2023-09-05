import { Test, TestingModule } from '@nestjs/testing';
import { UeController } from './ue.controller';
import { UeService } from './ue.service';

describe('UeController', () => {
  let controller: UeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UeController],
      providers: [UeService],
    }).compile();

    controller = module.get<UeController>(UeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
