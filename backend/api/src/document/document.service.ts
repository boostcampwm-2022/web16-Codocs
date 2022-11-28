import { plainToClass } from '@nestjs/class-transformer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
import { DocumentCreateDTO } from './dto/document-create.dto';
import { DocumentResponseDTO } from './dto/document-response.dto';
import { DocumentUpdateDTO } from './dto/document-update.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>
  ) {}

  create(documentCreateDTO: DocumentCreateDTO) {
    this.documentRepository.save(documentCreateDTO);
  }

  async list(): Promise<DocumentResponseDTO[]> {
    const documents = await this.documentRepository.find();
    console.log(documents);
    return documents.map((entity) => plainToClass(DocumentResponseDTO, entity));
  }

  findOne(id: string) {
    const entity = this.documentRepository.findOneBy({ id });
    return plainToClass(DocumentResponseDTO, entity);
  }

  update(id: string, documentUpdateDTO: DocumentUpdateDTO) {
    return this.documentRepository.update(id, documentUpdateDTO);
  }

  remove(id: string) {
    return this.documentRepository.softDelete(id);
  }
}
