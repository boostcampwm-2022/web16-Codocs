import { Test, TestingModule } from '@nestjs/testing';
import { UserdocumentController } from './userdocument.controller';

describe('UserdocumentController', () => {
  let controller: UserdocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserdocumentController],
    }).compile();

    controller = module.get<UserdocumentController>(UserdocumentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
