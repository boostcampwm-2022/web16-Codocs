import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Char } from 'src/types/char';

export class DocumentUpdateDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  // @IsString()
  @IsOptional()
  content: any;
}
