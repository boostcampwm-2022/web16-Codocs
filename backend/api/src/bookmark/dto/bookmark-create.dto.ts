import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { Document } from 'src/document/document.entity';
import { User } from 'src/user/user.entity';

export class BookmarkCreateDTO {
  @IsUUID()
  @ApiProperty()
  user!: User;

  @IsUUID()
  @ApiProperty()
  document!: Document;
}
