import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class UserUpdateDTO {
  @IsString()
  @ApiProperty()
  name: string;

  // email: string;

  @IsUrl()
  @ApiProperty()
  profileURL: string;
}
