import { Exclude, Expose } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from '../document.entity';

@Exclude()
export class DocumentResponseDTO {
  constructor(document: Document) {
    this.id = document?.id;
    this.title = document?.title;
    this.createdAt = document?.createdAt;
  }

  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}
