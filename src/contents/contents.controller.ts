import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dtos/create-content.dto';
import { ContentCategory } from './content.entity';
import { UpdateContentDto } from './dtos/update-content.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ContentDto } from './dtos/content.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Serialize(ContentDto)
@Controller('contents')
export class ContentsController {
  constructor(private contentsService: ContentsService) {}
  @Post()
  @ApiOperation({ summary: 'Create new content' })
  @ApiBody({ type: CreateContentDto })
  @ApiResponse({
    status: 201,
    description: 'Content successfully created',
    type: ContentDto,
  })
  createContent(
    @CurrentUser() currentUser: User,
    @Body() body: CreateContentDto,
  ) {
    return this.contentsService.create(currentUser, body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all contents' })
  @ApiResponse({
    status: 200,
    description: 'The found contents',
    type: ContentDto,
    isArray: true,
  })
  getAll() {
    return this.contentsService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a content by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Content ID' })
  @ApiResponse({
    status: 200,
    description: 'The found content',
    type: ContentDto,
  })
  getOneById(@Param('id') id: number) {
    return this.contentsService.findOne(id);
  }

  @Get('/category/:category')
  @ApiOperation({ summary: 'Get contents by category' })
  @ApiParam({
    name: 'category',
    type: 'string',
    description: 'Content category',
    enum: ContentCategory,
  })
  @ApiResponse({
    status: 200,
    description: 'The found contents',
    type: ContentDto,
    isArray: true,
  })
  getAllByCategory(@Param('category') category: ContentCategory) {
    return this.contentsService.findAllByCategory(category);
  }

  @Get('/title/:title')
  @ApiOperation({ summary: 'Get contents by title' })
  @ApiParam({
    name: 'title',
    type: 'string',
    description: 'Content title',
  })
  @ApiResponse({
    status: 200,
    description: 'The found contents',
    type: ContentDto,
    isArray: true,
  })
  getAllByTitle(@Param('title') title: string) {
    return this.contentsService.findAllByTitle(title);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a content' })
  @ApiParam({ name: 'id', type: 'number', description: 'Content ID' })
  @ApiBody({ type: UpdateContentDto })
  @ApiResponse({
    status: 200,
    description: 'Content successfully updated',
    type: ContentDto,
  })
  updateContent(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateContentDto,
  ) {
    return this.contentsService.update(id, body);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a content' })
  @ApiParam({ name: 'id', type: 'number', description: 'Content ID' })
  @ApiResponse({
    status: 200,
    description: 'Content successfully deleted',
  })
  deleteContent(@Param('id') id: number) {
    return this.contentsService.remove(id);
  }
}
