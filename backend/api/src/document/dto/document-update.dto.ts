import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DocumentUpdateDTO {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;
}
