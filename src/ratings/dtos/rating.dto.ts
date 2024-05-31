import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class RatingDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  stars: number;

  @ApiProperty()
  @Transform(({ obj }) => {
    return obj?.content?.id;
  })
  @Expose()
  contentId: number;

  @ApiProperty()
  @Transform(({ obj }) => {
    return obj?.user?.id;
  })
  @Expose()
  userId: number;
}
