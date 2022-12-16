import { plainToClass } from '@nestjs/class-transformer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Bookmark } from './bookmark.entity';
import { BookmarkCreateDTO } from './dto/bookmark-create.dto';
import { BookmarkResponseDTO } from './dto/bookmark-response.dto';
import { Document } from 'src/document/document.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private boookmarkRepository: Repository<Bookmark>
  ) {}
  async create(bookmarkCreateDTO: BookmarkCreateDTO) {
    const bookmark: Bookmark = this.boookmarkRepository.create({ ...bookmarkCreateDTO });

    try {
      await this.boookmarkRepository.save(bookmark);
    } catch (e) {
      console.error(e.code);
    }
  }

  async list(): Promise<BookmarkResponseDTO[]> {
    const bookmarks = await this.boookmarkRepository.find({
      relations: ['user', 'document'],
      loadRelationIds: true
    });
    return bookmarks.map((entity) => plainToClass(BookmarkResponseDTO, entity));
  }

  findOne(id: string) {
    const entity = this.boookmarkRepository.find({
      relations: ['user', 'document'],
      loadRelationIds: true,
      where: { id }
    });
    return plainToClass(BookmarkResponseDTO, entity);
  }

  remove(id: string) {
    return this.boookmarkRepository.delete(id);
  }
}
