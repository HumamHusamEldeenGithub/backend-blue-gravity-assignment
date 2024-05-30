import { Expose, Transform } from 'class-transformer';
import { User } from 'src/users/user.entity';

export class ContentDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  category: string;

  @Expose()
  thumbnailUrl: string;

  @Expose()
  contentUrl: string;

  @Expose()
  createdAt: Date;

  @Transform(({ obj }) => {
    return obj?.user?.id;
  })
  @Expose()
  userId: number;
}
