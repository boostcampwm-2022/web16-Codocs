import { Test, TestingModule } from '@nestjs/testing';
import { UserdocumentService } from './userdocument.service';

describe('UserdocumentService', () => {
  let service: UserdocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserdocumentService],
    }).compile();

    service = module.get<UserdocumentService>(UserdocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
