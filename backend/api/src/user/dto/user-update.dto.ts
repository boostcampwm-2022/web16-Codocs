import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UserUpdateDTO {
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  name: string;

  @IsUrl()
  @ApiPropertyOptional()
  @IsOptional()
  profileURL: string;
}
