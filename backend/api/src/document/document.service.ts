import { plainToClass } from '@nestjs/class-transformer';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
import { DocumentCreateDTO } from './dto/document-create.dto';
import { DocumentResponseDTO } from './dto/document-response.dto';
import { DocumentUpdateDTO } from './dto/document-update.dto';
import Redis from 'ioredis';
import { DocumentDetailResponseDTO } from './dto/document-detail-response.dto';
import { User } from '../user/user.entity';
import { UserDocument } from '../userdocument/userdocument.entity';
import { Char } from 'src/types/char';
import { UserRole } from '../enum/role.enum';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    @InjectRepository(UserDocument)
    private userDocumentRepository: Repository<UserDocument>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject('REDIS_CLIENT') private readonly redis: Redis
  ) {}

  async create(documentCreateDTO: DocumentCreateDTO, user): Promise<DocumentResponseDTO> {
    const documentEntity = await this.documentRepository.save(documentCreateDTO);
    const userEntity = await this.userRepository.findOneBy({ nodeId: user.nodeId });
    this.userDocumentRepository.save(new UserDocument(userEntity, documentEntity, UserRole.OWNER));

    return new DocumentResponseDTO(documentEntity);
  }

  async list(): Promise<DocumentResponseDTO[]> {
    const documents = await this.documentRepository.find();
    return documents.map((entity) => plainToClass(DocumentResponseDTO, entity));
  }

  async findOne(id: string, user: { nodeId; name }): Promise<DocumentDetailResponseDTO> {
    const documentEntity: Document = await this.documentRepository.findOne({
      relations: ['userRelations'],
      loadRelationIds: true,
      where: { id }
    });
    const response = plainToClass(DocumentResponseDTO, documentEntity);
    const content = await this.redis.hgetall(id);

    if (user) {
      const userEntity = await this.userRepository.findOneBy({ nodeId: user.nodeId });
      let userDocument = await this.userDocumentRepository.findOne({
        where: { user: { id: userEntity.id }, document: { id: documentEntity.id } }
      });
      if (userDocument == null) {
        userDocument = new UserDocument(userEntity, documentEntity);
      }
      documentEntity.addUserRelation(userDocument);
      userDocument.setLastVisitedNow();
      this.userDocumentRepository.save(userDocument);
    }

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
    content.forEach(async (char) => {
      this.redis.hset(id, char.id, JSON.stringify(char));
    });
  }

  // async saveContent(id: string, documentUpdateDTO: DocumentUpdateDTO) {
  //   const { content } = documentUpdateDTO;
  //   if (content == undefined) {
  //     throw new Error('no content');
  //   }

  //   this.redis.hset(id, id, JSON.stringify(content));
  // }

  async insertContent(id: string, documentUpdateDTO: DocumentUpdateDTO) {
    const { content } = documentUpdateDTO;
    if (content == undefined) {
      throw new HttpException('no content', 400);
    }
    if ((await this.redis.hget(id, 'HEAD')) == null) {
      this.redis.hset(
        id,
        'HEAD',
        JSON.stringify({
          id: 'HEAD',
          leftId: 'START',
          rightId: 'TAIL',
          siteId: '',
          value: '',
          tombstone: true
        })
      );
      this.redis.hset(
        id,
        'TAIL',
        JSON.stringify({
          id: 'TAIL',
          leftId: 'HEAD',
          rightId: 'END',
          siteId: '',
          value: '',
          tombstone: true
        })
      );
    }

    content.forEach(async (char) => {
      try {
        this.redis.hset(id, char.id, JSON.stringify(char));
        const left: Char = JSON.parse(await this.redis.hget(id, char.leftId));
        const right: Char = JSON.parse(await this.redis.hget(id, char.rightId));
        left.rightId = char.id;
        right.leftId = char.id;
        this.redis.hset(id, left.id, JSON.stringify(left));
        this.redis.hset(id, right.id, JSON.stringify(right));
      } catch (e) {
        // throw new HttpException('Insert Error', 400);
      }
    });
  }

  async remove(id: string) {
    const document = await this.documentRepository.findOne({
      relations: ['userRelations'],
      where: { id }
    });
    return this.documentRepository.softRemove(document);
  }
}
