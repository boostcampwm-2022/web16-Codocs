import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bookmark } from './bookmark.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private boookmarkRepository: Repository<Bookmark>
  ) {}
  list(): Promise<Bookmark[]> {
    return this.boookmarkRepository.find();
  }
}
