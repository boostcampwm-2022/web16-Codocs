import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsUUID } from 'class-validator';
import { User } from 'src/user/user.entity';
import { UserRole } from '../enum/role.enum';
import { Document } from 'src/document/document.entity';

export class UserDocumentUpdateDTO {
  @ApiProperty()
  @IsUUID()
  document: Document;

  @ApiProperty()
  @IsUUID()
  user: User;

  @ApiProperty()
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty()
  @IsDate()
  lastVisited: Date;
}
