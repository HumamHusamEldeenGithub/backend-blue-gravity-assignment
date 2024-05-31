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
import { CurrentUser } from '../decorators/current-user.decorator';
import { Serialize } from '../interceptors/serialize.interceptor';
import { RatingDto } from './dtos/rating.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '../users/user.entity';

@Serialize(RatingDto)
@Controller('ratings')
export class RatingsController {
  constructor(private ratingsService: RatingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new rating' })
  @ApiBody({ type: CreateRatingDto })
  @ApiResponse({
    status: 201,
    description: 'Rating successfully created',
    type: RatingDto,
  })
  createRating(@CurrentUser() user: User, @Body() body: CreateRatingDto) {
    return this.ratingsService.create(user, body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all ratings' })
  @ApiResponse({
    status: 200,
    description: 'The found ratings',
    type: RatingDto,
    isArray: true,
  })
  getAllRatings() {
    return this.ratingsService.findAll();
  }

  @Get('/user/:id')
  @ApiOperation({ summary: 'Get all ratings belong to a user' })
  @ApiResponse({
    status: 200,
    description: 'The found ratings',
    type: RatingDto,
    isArray: true,
  })
  getAllRatingsByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.ratingsService.findAllByUserId(id);
  }

  @Get('/content/:id')
  @ApiOperation({ summary: 'Get all ratings belong to a content' })
  @ApiResponse({
    status: 200,
    description: 'The found ratings',
    type: RatingDto,
    isArray: true,
  })
  getAllRatingsByContentId(@Param('id', ParseIntPipe) id: number) {
    return this.ratingsService.findAllByContentId(id);
  }
}
