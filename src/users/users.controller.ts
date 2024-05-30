import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor() {}

  @Get()
  getUser() {
    return 'Success';
  }
}
