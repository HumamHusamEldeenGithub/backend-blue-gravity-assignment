import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from './user.entity';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get('/by-info/email')
  getByEmail(@Query('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Delete()
  deleteUser(@CurrentUser() currentUser: User) {
    return this.usersService.delete(currentUser.id);
  }
}
