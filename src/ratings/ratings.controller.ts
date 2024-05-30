import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dtos/create-rating.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Serialize } from '../interceptors/serialize.interceptor';
import { RatingDto } from './dtos/rating.dto';

@Serialize(RatingDto)
@Controller('ratings')
export class RatingsController {
  constructor(private ratingsService: RatingsService) {}

  @Post()
  createRating(@CurrentUser() user, @Body() body: CreateRatingDto) {
    return this.ratingsService.create(user, body);
  }

  @Get()
  getAllRatings() {
    return this.ratingsService.findAll();
  }

  @Get('/user/:id')
  getAllRatingsByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.ratingsService.findAllByUserId(id);
  }

  @Get('/content/:id')
  getAllRatingsByContentId(@Param('id', ParseIntPipe) id: number) {
    return this.ratingsService.findAllByContentId(id);
  }
}
