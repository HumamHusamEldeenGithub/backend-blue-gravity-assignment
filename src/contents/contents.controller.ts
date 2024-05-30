import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dtos/create-content.dto';
import { ContentCategory } from './content.entity';
import { UpdateContentDto } from './dtos/update_content.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ContentDto } from './dtos/content.dto';

@Serialize(ContentDto)
@Controller('contents')
export class ContentsController {
  constructor(private contentsService: ContentsService) {}
  @Post()
  createContent(
    @CurrentUser() currentUser: User,
    @Body() body: CreateContentDto,
  ) {
    return this.contentsService.create(currentUser, body);
  }

  @Get()
  getAll() {
    return this.contentsService.findAll();
  }

  @Get('/:id')
  getOneById(@Param('id') id: number) {
    return this.contentsService.findOne(id);
  }

  @Get('/category/:category')
  getAllByCategory(@Param('category') category: ContentCategory) {
    return this.contentsService.findAllByCategory(category);
  }

  @Get('/title/:title')
  getAllByTitle(@Param('title') title: string) {
    return this.contentsService.findAllByTitle(title);
  }

  @Patch('/:id')
  updateContent(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateContentDto,
  ) {
    return this.contentsService.update(id, body);
  }

  @Delete('/:id')
  deleteContent(@Param('id') id: number) {
    return this.contentsService.remove(id);
  }
}
