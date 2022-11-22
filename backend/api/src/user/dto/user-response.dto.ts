import { Exclude, Expose } from '@nestjs/class-transformer';

@Exclude()
export class UserResponseDTO {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  profileURL: string;

  @Expose()
  createdAt: Date;
}
