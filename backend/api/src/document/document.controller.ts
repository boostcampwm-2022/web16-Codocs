import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentResponseDTO } from './dto/document-response.dto';
import { DocumentCreateDTO } from './dto/document-create.dto';
import { DocumentUpdateDTO } from './dto/document-update.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Document } from './document.entity';
import { DocumentDetailResponseDTO } from './dto/document-detail-response.dto';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt-auth.guard';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '문서 생성 API', description: '문서 생성' })
  @ApiCreatedResponse({ description: '문서 생성됨' })
  create(@Req() req, @Body() documentCreateDTO: DocumentCreateDTO): Promise<DocumentResponseDTO> {
    return this.documentService.create(documentCreateDTO, req.user);
  }

  @Get(':id')
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({ summary: '문서 정보 API', description: '해당 uuid 문서 정보 얻기' })
  @ApiCreatedResponse({ description: '문서 정보', type: DocumentDetailResponseDTO })
  async findOne(@Req() req: Request, @Param('id') id: string) {
    return this.documentService.findOne(id, req.user as { nodeId; name });
  }

  @Post(':id/save-title')
  @ApiOperation({ summary: '문서 제목 저장 API', description: '해당 uuid 문서 제목 저장하기' })
  @ApiResponse({ description: '저장됨' })
  saveTitle(@Param('id') id: string, @Body() documentUpdateDTO: DocumentUpdateDTO) {
    return this.documentService.saveTitle(id, documentUpdateDTO);
  }

  @Post(':id/save-content')
  @ApiOperation({ summary: '문서 컨텐츠 저장 API', description: '해당 uuid 문서 컨텐츠 저장하기' })
  @ApiResponse({ description: '저장됨' })
  saveContent(@Param('id') id: string, @Body() documentUpdateDTO: DocumentUpdateDTO) {
    return this.documentService.insertContent(id, documentUpdateDTO);
  }

  @Post(':id/update-content')
  @ApiOperation({ summary: '문서 컨텐츠 저장 API', description: '해당 uuid 문서 컨텐츠 저장하기' })
  @ApiResponse({ description: '저장됨' })
  updateContent(@Param('id') id: string, @Body() documentUpdateDTO: DocumentUpdateDTO) {
    return this.documentService.updateContent(id, documentUpdateDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: '문서 삭제 API', description: '해당 uuid 문서 삭제하기' })
  @ApiResponse({ description: '삭제됨' })
  remove(@Param('id') id: string) {
    return this.documentService.remove(id);
  }
}
