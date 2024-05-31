import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dtos/signin.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthDto } from './dtos/auth.dto';
import { Response } from 'express';
import { Public } from '../decorators/is-public.decorator';
import { SignupDto } from './dtos/signup.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Serialize(AuthDto)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: 'Sign up with email and password' })
  @ApiBody({ type: SignupDto })
  @ApiResponse({
    status: 200,
    description: 'User has been created',
    type: [AuthDto],
  })
  @Post('/signup')
  async signup(@Body() body: SignupDto, @Res() res: Response) {
    const token = await this.authService.signup(body.email, body.password);
    res.setHeader('authorization', `Bearer ${token.accessToken}`);
    return res.send(token);
  }

  @Public()
  @ApiOperation({ summary: 'Sign in with email and password' })
  @ApiBody({ type: SigninDto })
  @ApiResponse({
    status: 200,
    description: 'Signed in succeeded',
    type: [AuthDto],
  })
  @Post('/signin')
  async signin(@Body() body: SigninDto, @Res() res: Response) {
    const token = await this.authService.signin(body.email, body.password);
    res.setHeader('authorization', `Bearer ${token.accessToken}`);
    return res.send(token);
  }
}
