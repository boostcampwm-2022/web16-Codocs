import { Exclude, Expose } from '@nestjs/class-transformer';
import { Document } from 'src/document/document.entity';
import { User } from 'src/user/user.entity';
import { UserRole } from '../enum/role.enum';

@Exclude()
export class UserDocumentResponseDTO {
  @Expose()
  id: string;

  @Expose()
  document: Document;

  @Expose()
  user: User;

  @Expose()
  lastVisited: Date;

  @Expose()
  role: UserRole;

  @Expose()
  createdAt: Date;
}
