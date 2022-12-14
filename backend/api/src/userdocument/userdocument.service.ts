import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { catchError } from 'rxjs';
import { User } from 'src/user/user.entity';
import { Repository, Not } from 'typeorm';
import { UserDocumentCreateDTO } from './dto/userdocument-create.dto';
import { UserDocumentResponseDTO } from './dto/userdocument-response.dto';
import { UserDocumentUpdateDTO } from './dto/userdocument-update.dto';
import { UserRole } from '../enum/role.enum';
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

  async getUserDocuments(nodeId: string) {
    const userDocuments = await this.userDocumentRepository.find({
      relations: ['document', 'user'],
      where: { user: { nodeId } },
      order: { lastVisited: 'DESC' }
    });

    return userDocuments.map((userDocument) => new UserDocumentResponseDTO(userDocument));
  }

  async getPrivateDocuments(nodeId: string) {
    const userDocuments = await this.userDocumentRepository.find({
      relations: ['document', 'user'],
      where: { user: { nodeId }, role: UserRole.OWNER },
      order: { lastVisited: 'DESC' }
    });

    return userDocuments.map((userDocument) => new UserDocumentResponseDTO(userDocument));
  }

  async getSharedDocuments(nodeId: string) {
    const userDocuments = await this.userDocumentRepository.find({
      relations: ['document', 'user'],
      where: { user: { nodeId }, role: Not(UserRole.OWNER) },
      order: { lastVisited: 'DESC' }
    });

    return userDocuments.map((userDocument) => new UserDocumentResponseDTO(userDocument));
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
