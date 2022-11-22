import { User } from 'src/user/user.entity';
import { UserRole } from '../enum/role.enum';

export class UserDocumentCreateDTO {
  document: Document;

  user: User;

  role: UserRole;
}
