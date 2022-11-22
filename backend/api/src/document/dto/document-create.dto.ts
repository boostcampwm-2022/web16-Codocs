import { User } from 'src/user/user.entity';

export class DocumentCreateDTO {
  title: string;
  writer: User;
}
