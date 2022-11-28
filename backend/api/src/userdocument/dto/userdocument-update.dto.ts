import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { UserRole } from '../enum/role.enum';

export class UserDocumentUpdateDTO {
  @ApiProperty()
  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  lastVisited: Date;
}
