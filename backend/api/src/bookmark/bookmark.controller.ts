import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkCreateDTO } from './dto/bookmark-create.dto';
import { BookmarkResponseDTO } from './dto/bookmark-response.dto';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get()
  async list(): Promise<BookmarkResponseDTO[]> {
    return this.bookmarkService.list();
  }
  @Post()
  create(@Body() bookmarkCreateDTO: BookmarkCreateDTO) {
    return this.bookmarkService.create(bookmarkCreateDTO);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookmarkService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookmarkService.remove(id);
  }
}
