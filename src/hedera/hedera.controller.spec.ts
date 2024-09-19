import { Test, TestingModule } from '@nestjs/testing';
import { HederaController } from './hedera.controller';
import { HederaService } from './hedera.service';

describe('HederaController', () => {
  let controller: HederaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HederaController],
      providers: [HederaService],
    }).compile();

    controller = module.get<HederaController>(HederaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
