import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';
import { User } from 'src/user/user.entity';
import { UserRole } from '../enum/role.enum';
import { Document } from 'src/document/document.entity';

export class UserDocumentCreateDTO {
  @ApiProperty()
  @IsUUID()
  document: Document;

  @ApiProperty()
  @IsUUID()
  user: User;

  @ApiProperty()
  @IsEnum(UserRole)
  role: UserRole;
}
