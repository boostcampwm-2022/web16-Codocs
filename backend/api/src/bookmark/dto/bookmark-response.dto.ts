import { Exclude, Expose } from '@nestjs/class-transformer';
import { User } from 'src/user/user.entity';
import { Document } from 'src/document/document.entity';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class BookmarkResponseDTO {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  user: User;

  @ApiProperty()
  @Expose()
  document: Document;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}
