import { User } from 'src/user/user.entity';
import { UserRole } from '../enum/role.enum';

export class UserDocumentUpdateDTO {
  id: string;

  document: Document;

  user: User;

  role: UserRole;

  lastVisited: Date;

  createdAt: Date;
}
