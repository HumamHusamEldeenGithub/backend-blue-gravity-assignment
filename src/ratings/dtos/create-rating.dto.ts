import { IsNumber } from 'class-validator';

export class CreateRatingDto {
  @IsNumber()
  contentId: number;

  @IsNumber()
  rating: number;
}