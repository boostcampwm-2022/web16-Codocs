import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkService } from './bookmark.service';

describe('BookmarkService', () => {
  let service: BookmarkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookmarkService],
    }).compile();

    service = module.get<BookmarkService>(BookmarkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
