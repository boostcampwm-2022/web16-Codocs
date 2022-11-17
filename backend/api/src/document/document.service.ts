import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';

@Injectable()
export class DocumentService {
  // constructor(
  //   @InjectRepository(Document)
  //   private documentRepository: Repository<Document>
  // ) {}
  // list(): Promise<Document[]> {
  //   return this.documentRepository.find();
  // }
}
