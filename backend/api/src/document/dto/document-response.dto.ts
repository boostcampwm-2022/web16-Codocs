import { Exclude, Expose } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class DocumentResponseDTO {
  constructor(id, title, createdAt) {
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
  }

  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}
