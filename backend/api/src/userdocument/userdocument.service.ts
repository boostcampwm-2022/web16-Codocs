import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDocument } from './userdocument.entity';

@Injectable()
export class UserdocumentService {
  constructor(
    @InjectRepository(UserDocument)
    private userDocumentRepository: Repository<UserDocument>
  ) {}
  list(): Promise<UserDocument[]> {
    return this.userDocumentRepository.find();
  }
}
