import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class UserCreateDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  nodeId: string;

  @ApiProperty()
  @IsUrl()
  profileURL: string;

  constructor(name: string, nodeId: string, profileURL: string) {
    this.name = name;
    this.nodeId = nodeId;
    this.profileURL = profileURL;
  }
}
