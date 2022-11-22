import { Exclude, Expose } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'src/document/document.entity';
import { User } from 'src/user/user.entity';
import { UserRole } from '../enum/role.enum';

@Exclude()
export class UserDocumentResponseDTO {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  document: Document;

  @ApiProperty()
  @Expose()
  user: User;

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
