import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { catchError } from 'rxjs';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { UserDocumentCreateDTO } from './dto/userdocument-create.dto';
import { UserDocumentResponseDTO } from './dto/userdocument-response.dto';
import { UserDocumentUpdateDTO } from './dto/userdocument-update.dto';
import { UserDocument } from './userdocument.entity';

@Injectable()
export class UserDocumentService {
  constructor(
    @InjectRepository(UserDocument)
    private userDocumentRepository: Repository<UserDocument>
  ) {}

  async list(): Promise<UserDocumentResponseDTO[]> {
    const userDocuments = await this.userDocumentRepository.find();
    return userDocuments.map((entity) => plainToClass(UserDocumentResponseDTO, entity));
  }

  async create(userDocumentCreateDTO: UserDocumentCreateDTO) {
    try {
      await this.userDocumentRepository.save(userDocumentCreateDTO);
    } catch (e) {
      console.log(e.code);
    }
  }

  async getUserDocuments(email: string) {
    const userDocuments = await this.userDocumentRepository.find({
      relations: ['user', 'document'],
      loadRelationIds: true,
      where: { user: { email } },
      order: { lastVisited: 'DESC' }
    });

    return userDocuments.map((userDocument) => plainToClass(UserDocumentResponseDTO, userDocument));
  }

  findOne(id: string) {
    const entity = this.userDocumentRepository.findOneBy({ id });
    return plainToClass(UserDocumentResponseDTO, entity);
  }

  update(id: string, userDocumentUpdateDTO: UserDocumentUpdateDTO) {
    return this.userDocumentRepository.update(id, userDocumentUpdateDTO);
  }

  remove(id: string) {
    return this.userDocumentRepository.delete(id);
  }
}
