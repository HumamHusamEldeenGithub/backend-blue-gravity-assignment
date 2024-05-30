import { Expose, Transform } from 'class-transformer';

export class RatingDto {
  @Expose()
  id: number;

  @Expose()
  stars: number;

  @Transform(({ obj }) => {
    return obj?.content?.id;
  })
  @Expose()
  contentId: number;

  @Transform(({ obj }) => {
    return obj?.user?.id;
  })
  @Expose()
  userId: number;
}
