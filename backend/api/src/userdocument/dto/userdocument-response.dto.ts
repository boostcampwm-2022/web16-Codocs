import { Exclude, Expose } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'src/document/document.entity';
import { DocumentResponseDTO } from 'src/document/dto/document-response.dto';
import { User } from 'src/user/user.entity';
import { UserRole } from '../enum/role.enum';
import { UserDocument } from '../userdocument.entity';

@Exclude()
export class UserDocumentResponseDTO {
  constructor(userDocument: UserDocument) {
    const { id, user, document, lastVisited, role, createdAt } = userDocument;
    this.id = id;
    this.user = user.id;
    this.document = new DocumentResponseDTO(document.id, document.title, document.createdAt);
    this.lastVisited = lastVisited;
    this.role = role;
    this.createdAt = createdAt;
  }

  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  document: DocumentResponseDTO;

  @ApiProperty()
  @Expose()
  user: string;

  @ApiProperty()
  @Expose()
  lastVisited: Date;

  @ApiProperty()
  @Expose()
  role: UserRole;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}
