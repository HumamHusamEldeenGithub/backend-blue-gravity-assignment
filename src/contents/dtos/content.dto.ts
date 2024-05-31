import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { RatingDto } from 'src/ratings/dtos/rating.dto';
import { Rating } from 'src/ratings/rating.entity';

export class ContentDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  category: string;

  @ApiProperty()
  @Expose()
  thumbnailUrl: string;

  @ApiProperty()
  @Expose()
  contentUrl: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Transform(({ obj }) => {
    return obj?.user?.id;
  })
  @Expose()
  authorId: number;

  @ApiProperty({ type: () => RatingDto, isArray: true })
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
