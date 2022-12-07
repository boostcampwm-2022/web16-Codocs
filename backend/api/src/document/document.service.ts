import { plainToClass } from '@nestjs/class-transformer';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
import { DocumentCreateDTO } from './dto/document-create.dto';
import { DocumentResponseDTO } from './dto/document-response.dto';
import { DocumentUpdateDTO } from './dto/document-update.dto';
import Redis from 'ioredis';
import { DocumentDetailResponseDTO } from './dto/document-detail-response.dto';

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

  async findOne(id: string): Promise<DocumentDetailResponseDTO> {
    const entity: Document = await this.documentRepository.findOneBy({ id });
    const response = plainToClass(DocumentResponseDTO, entity);
    return { ...response, content: await this.redis.hgetall(id) };
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
    content.forEach((char) => {
      this.redis.hset(id, char.id, JSON.stringify(char));
    });
  }

  remove(id: string) {
    return this.documentRepository.softDelete(id);
  }
}
