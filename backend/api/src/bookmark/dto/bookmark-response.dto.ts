import { Exclude, Expose } from '@nestjs/class-transformer';
import { User } from 'src/user/user.entity';
import { Document } from 'src/document/document.entity';

@Exclude()
export class BookmarkResponseDTO {
  @Expose()
  id: string;

  @Expose()
  user: User;

  @Expose()
  document: Document;

  @Expose()
  createdAt: Date;
}
