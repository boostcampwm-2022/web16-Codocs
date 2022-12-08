import { User } from '../../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class DocumentCreateDTO {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsUUID()
  writer: User;
}
