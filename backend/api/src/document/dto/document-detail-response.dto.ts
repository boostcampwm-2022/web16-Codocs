import { Exclude, Expose } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class DocumentDetailResponseDTO {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  content: Record<string, string>;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}
