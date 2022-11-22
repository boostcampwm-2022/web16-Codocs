import { Document } from 'src/document/document.entity';
import { User } from 'src/user/user.entity';

export class BookmarkCreateDTO {
  user: User;
  document: Document;
}
