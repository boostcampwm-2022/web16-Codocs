import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentResponseDTO } from './dto/document-response.dto';
import { DocumentCreateDTO } from './dto/document-create.dto';
import { DocumentUpdateDTO } from './dto/document-update.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Document } from './document.entity';

@ApiTags('Document API')
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  @ApiOperation({ summary: '문서 목록 API', description: '문서 목록을 반환한다.' })
  @ApiResponse({ description: '문서 목록을 반환한다.', type: Document })
  async list(): Promise<DocumentResponseDTO[]> {
    return this.documentService.list();
  }
  @Post()
  create(@Body() documentCreateDTO: DocumentCreateDTO) {
    return this.documentService.create(documentCreateDTO);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() documentUpdateDTO: DocumentUpdateDTO) {
    return this.documentService.update(id, documentUpdateDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentService.remove(id);
  }
}
