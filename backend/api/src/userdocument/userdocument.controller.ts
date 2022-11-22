import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserDocumentCreateDTO } from './dto/userdocument-create.dto';
import { UserDocumentResponseDTO } from './dto/userdocument-response.dto';
import { UserDocumentUpdateDTO } from './dto/userdocument-update.dto';
import { UserDocumentService } from './userdocument.service';

@Controller('userdocument')
export class UserdocumentController {
  constructor(private readonly userDocumentService: UserDocumentService) {}

  @Get()
  async list(): Promise<UserDocumentResponseDTO[]> {
    return this.userDocumentService.list();
  }
  @Post()
  create(@Body() userDocumentCreateDTO: UserDocumentCreateDTO) {
    return this.userDocumentService.create(userDocumentCreateDTO);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userDocumentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() userDocumentUpdateDTO: UserDocumentUpdateDTO) {
    return this.userDocumentService.update(id, userDocumentUpdateDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userDocumentService.remove(id);
  }
}
