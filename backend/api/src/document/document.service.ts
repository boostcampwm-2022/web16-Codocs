import { plainToClass } from '@nestjs/class-transformer';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
import { DocumentCreateDTO } from './dto/document-create.dto';
import { DocumentResponseDTO } from './dto/document-response.dto';
import { DocumentUpdateDTO } from './dto/document-update.dto';
import Redis from 'ioredis';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    @Inject('REDIS_CLIENT') private readonly redis: Redis
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

  saveTitle(id: string, documentUpdateDTO: DocumentUpdateDTO) {
    const { title } = documentUpdateDTO;
    if (title == undefined) {
      throw new Error('no title');
    }
    return this.documentRepository.update(id, { title });
  }

  saveContent(id: string, documentUpdateDTO: DocumentUpdateDTO) {
    const { content } = documentUpdateDTO;
    if (content == undefined) {
      throw new Error('no content');
    }
    this.redis.hset(id, 'char_uuid3', JSON.stringify(content));
    // return this.documentRepository.update(id, { content });
  }

  remove(id: string) {
    return this.documentRepository.softDelete(id);
  }
}
