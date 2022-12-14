import { Exclude, Expose } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'src/document/document.entity';
import { DocumentResponseDTO } from 'src/document/dto/document-response.dto';
import { User } from 'src/user/user.entity';
import { UserRole } from '../../enum/role.enum';
import { UserDocument } from '../userdocument.entity';

@Exclude()
export class UserDocumentResponseDTO {
  constructor(userDocument: UserDocument) {
    const { document, lastVisited, role, createdAt, isBookmarked } = userDocument;
    this.id = document?.id;
    this.title = document?.title;
    this.createdAt = document?.createdAt;
    this.lastVisited = lastVisited;
    this.role = role;
    this.createdAt = createdAt;
    this.isBookmarked = isBookmarked;
  }

  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  lastVisited: Date;

  @ApiProperty()
  @Expose()
  role: UserRole;

  @ApiProperty()
  @Expose()
  isBookmarked: boolean;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}
