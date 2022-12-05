import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUrl } from 'class-validator';

export class UserCreateDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsUrl()
  profileURL: string;

  constructor(name: string, email: string, profileURL: string) {
    this.name = name;
    this.email = email;
    this.profileURL = profileURL;
  }
}
