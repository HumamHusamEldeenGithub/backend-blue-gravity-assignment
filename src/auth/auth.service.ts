import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password/password.service';
import { User } from 'src/users/user.entity';
import { AuthDto } from './dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}
  async signup(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('email already in use');
    }

    const hashedPassword = await this.passwordService.hashPassword(password);
    const newUser = await this.usersService.create(email, hashedPassword);

    const payload: Partial<User> = { id: newUser.id, email: newUser.email };
    const token: AuthDto = {
      accessToken: await this.jwtService.signAsync(payload),
    };

    return token;
  }

  async signin(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const isMatched = await this.passwordService.comparePasswords(
      password,
      user.password,
    );
    if (!isMatched) {
      throw new UnauthorizedException();
    }

    const payload: Partial<User> = { id: user.id, email: user.email };
    const token: AuthDto = {
      accessToken: await this.jwtService.signAsync(payload),
    };

    return token;
  }
}
