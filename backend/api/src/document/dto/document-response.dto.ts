import { Exclude, Expose } from '@nestjs/class-transformer';

@Exclude()
export class DocumentResponseDTO {
  @Expose()
  id: string;
  @Expose()
  title: string;
  @Expose()
  createdAt: Date;
}
