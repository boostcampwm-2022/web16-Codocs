import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from './bookmark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark])],
  providers: [BookmarkService],
  controllers: [BookmarkController]
})
export class BookmarkModule {}
