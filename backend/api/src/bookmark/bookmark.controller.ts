import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookmarkService } from './bookmark.service';
import { BookmarkCreateDTO } from './dto/bookmark-create.dto';
import { BookmarkResponseDTO } from './dto/bookmark-response.dto';

@ApiTags('Bookmark API')
@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get()
  @ApiOperation({ summary: '북마크 목록 API', description: '북마크 목록을 반환한다.' })
  @ApiResponse({ description: '북마크 목록', type: [BookmarkResponseDTO] })
  async list(): Promise<BookmarkResponseDTO[]> {
    return this.bookmarkService.list();
  }

  @Post()
  @ApiOperation({ summary: '북마크 생성 API', description: '북마크 생성' })
  @ApiCreatedResponse({ description: '북마크 생성됨' })
  create(@Body() bookmarkCreateDTO: BookmarkCreateDTO) {
    return this.bookmarkService.create(bookmarkCreateDTO);
  }

  @Get(':id')
  @ApiOperation({ summary: '북마크 정보 API', description: '해당 uuid 북마크 정보 얻기' })
  @ApiCreatedResponse({ description: '북마크 정보', type: BookmarkResponseDTO })
  findOne(@Param('id') id: string) {
    return this.bookmarkService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: '북마크 삭제 API', description: '해당 uuid 북마크 삭제하기' })
  @ApiResponse({ description: '삭제됨' })
  remove(@Param('id') id: string) {
    return this.bookmarkService.remove(id);
  }
}
