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
import { Char } from 'src/types/char';

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
    const content = await this.redis.hgetall(id);
    return { ...response, content };
  }

  saveTitle(id: string, documentUpdateDTO: DocumentUpdateDTO) {
    const { title } = documentUpdateDTO;
    if (title == undefined) {
      throw new Error('no title');
    }
    return this.documentRepository.update(id, { title });
  }

  updateContent(id: string, documentUpdateDTO: DocumentUpdateDTO) {
    const { content } = documentUpdateDTO;
    if (content == undefined) {
      throw new Error('no content');
    }
    content.forEach((char) => {
      this.redis.hset(id, char.id, JSON.stringify(char));
    });
  }
  // async saveContent(id: string, documentUpdateDTO: DocumentUpdateDTO) {
  //   const { content } = documentUpdateDTO;
  //   console.log(content);
  //   if (content == undefined) {
  //     throw new Error('no content');
  //   }

  //   this.redis.hset(id, id, JSON.stringify(content));
  // }
  async insertContent(id: string, documentUpdateDTO: DocumentUpdateDTO) {
    const { content } = documentUpdateDTO;
    if (content == undefined) {
      throw new Error('no content');
    }

    this.redis.hmset(id, content);

    if ((await this.redis.hget(id, 'HEAD')) == null) {
      this.redis.hset(
        id,
        'HEAD',
        JSON.stringify({ id: 'HEAD', leftId: 'START', rightId: 'TAIL', siteId: '', value: '' })
      );
      this.redis.hset(
        id,
        'TAIL',
        JSON.stringify({ id: 'TAIL', leftId: 'HEAD', rightId: 'END', siteId: '', value: '' })
      );
    }
  }

  // content.forEach(async (char) => {
  //   this.redis.hset(id, char.id, JSON.stringify(char));
  //   const left: Char = JSON.parse(await this.redis.hget(id, char.leftId));
  //   const right: Char = JSON.parse(await this.redis.hget(id, char.rightId));
  //   left.rightId = char.id;
  //   right.leftId = char.id;
  //   this.redis.hset(id, left.id, JSON.stringify(left));
  //   this.redis.hset(id, right.id, JSON.stringify(right));
  // });

  remove(id: string) {
    return this.documentRepository.softDelete(id);
  }
}
