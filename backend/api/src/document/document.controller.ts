import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentResponseDTO } from './dto/document-response.dto';
import { DocumentCreateDTO } from './dto/document-create.dto';
import { DocumentUpdateDTO } from './dto/document-update.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Document } from './document.entity';

@ApiTags('Document API')
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  @ApiOperation({ summary: '문서 목록 API', description: '문서 목록을 반환한다.' })
  @ApiResponse({ description: '문서 목록', type: [DocumentResponseDTO] })
  async list(): Promise<DocumentResponseDTO[]> {
    return this.documentService.list();
  }

  @Post()
  @ApiOperation({ summary: '문서 생성 API', description: '문서 생성' })
  @ApiCreatedResponse({ description: '문서 생성됨' })
  create(@Body() documentCreateDTO: DocumentCreateDTO) {
    return this.documentService.create(documentCreateDTO);
  }

  @Get(':id')
  @ApiOperation({ summary: '문서 정보 API', description: '해당 uuid 문서 정보 얻기' })
  @ApiCreatedResponse({ description: '문서 정보', type: DocumentResponseDTO })
  findOne(@Param('id') id: string) {
    return this.documentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '문서 정보 변경 API', description: '해당 uuid 문서 정보 변경하기' })
  @ApiResponse({ description: '변경됨' })
  update(@Param('id') id: string, @Body() documentUpdateDTO: DocumentUpdateDTO) {
    return this.documentService.update(id, documentUpdateDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: '문서 삭제 API', description: '해당 uuid 문서 삭제하기' })
  @ApiResponse({ description: '삭제됨' })
  remove(@Param('id') id: string) {
    return this.documentService.remove(id);
  }
}
