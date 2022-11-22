import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DocumentResponseDTO } from 'src/document/dto/document-response.dto';
import { UserDocumentCreateDTO } from './dto/userdocument-create.dto';
import { UserDocumentResponseDTO } from './dto/userdocument-response.dto';
import { UserDocumentUpdateDTO } from './dto/userdocument-update.dto';
import { UserDocumentService } from './userdocument.service';

@ApiTags('UserDocument 관계 API')
@Controller('userdocument')
export class UserdocumentController {
  constructor(private readonly userDocumentService: UserDocumentService) {}

  @Get()
  @ApiOperation({
    summary: '유저문서 관계 목록 API',
    description: '유저문서 관계 목록을 반환한다.'
  })
  @ApiResponse({ description: '유저문서 관계 목록', type: [UserDocumentResponseDTO] })
  async list(): Promise<UserDocumentResponseDTO[]> {
    return this.userDocumentService.list();
  }

  @Post()
  @ApiOperation({ summary: '유저문서 관계 생성 API', description: '유저문서 관계 생성' })
  @ApiCreatedResponse({ description: '유저문서 관계 생성됨' })
  create(@Body() userDocumentCreateDTO: UserDocumentCreateDTO) {
    return this.userDocumentService.create(userDocumentCreateDTO);
  }

  @Get(':id')
  @ApiOperation({
    summary: '유저문서 관계 정보 API',
    description: '해당 uuid 유저문서 관계 정보 얻기'
  })
  @ApiCreatedResponse({ description: '유저문서 관계 정보', type: DocumentResponseDTO })
  findOne(@Param('id') id: string) {
    return this.userDocumentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '유저문서 관계 정보 변경 API',
    description: '해당 uuid 유저문서 관계 정보 변경하기'
  })
  @ApiResponse({ description: '변경됨' })
  update(@Param('id') id: string, @Body() userDocumentUpdateDTO: UserDocumentUpdateDTO) {
    return this.userDocumentService.update(id, userDocumentUpdateDTO);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '유저문서 관계 삭제 API',
    description: '해당 uuid 유저문서 관계 삭제하기'
  })
  @ApiResponse({ description: '삭제됨' })
  remove(@Param('id') id: string) {
    return this.userDocumentService.remove(id);
  }
}
