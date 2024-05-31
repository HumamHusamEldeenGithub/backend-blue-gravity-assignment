import { Expose, Transform } from 'class-transformer';
import { Rating } from 'src/ratings/rating.entity';

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
  authorId: number;

  @Transform(({ obj }) =>
    obj.ratings?.map((rating: Rating) => ({
      id: rating.id,
      userId: rating.user?.id,
      stars: rating.stars,
    })),
  )
  @Expose()
  ratings: Rating[];
}
