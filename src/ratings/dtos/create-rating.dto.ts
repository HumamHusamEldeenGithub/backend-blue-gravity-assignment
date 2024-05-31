import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty()
  @IsNumber()
  contentId: number;

  @ApiProperty()
  @IsNumber()
  rating: number;
}
