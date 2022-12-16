import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class DocumentCreateDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;
}
