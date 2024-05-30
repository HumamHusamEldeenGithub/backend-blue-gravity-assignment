import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signin.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthDto } from './dtos/auth.dto';
import { Response } from 'express';
import { Public } from '../decorators/is-public.decorator';
import { SignupDto } from './dtos/signup.dto';

@Serialize(AuthDto)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signup')
  async signup(@Body() body: SignupDto, @Res() res: Response) {
    const token = await this.authService.signup(body.email, body.password);
    res.setHeader('authorization', `Bearer ${token.accessToken}`);
    return res.send(token);
  }

  @Public()
  @Post('/signin')
  async signin(@Body() body: SignInDto, @Res() res: Response) {
    const token = await this.authService.signin(body.email, body.password);
    res.setHeader('authorization', `Bearer ${token.accessToken}`);
    return res.send(token);
  }
}
