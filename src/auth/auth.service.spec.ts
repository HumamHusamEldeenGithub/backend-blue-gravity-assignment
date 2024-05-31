import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { PasswordService } from './password/password.service';
import { User } from '../users/user.entity';
import {
  generateRandomEmail,
  generateRandomPassword,
} from '../utils/random-generator.util';

describe('AuthService', () => {
  let service: AuthService;
  let mockUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    mockUsersService = {
      findOneByEmail: (email: string) =>
        Promise.resolve(users.find((user) => user.email === email)),
      create: (email: string, password: string) => {
        const user: User = {
          id: Math.floor(Math.random() * 99999),
          email: email,
          password: password,
          contents: [],
          ratings: [],
        };
        users.push(user);
        return Promise.resolve(user);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: 'test',
          signOptions: { expiresIn: '3h' },
        }),
      ],
      providers: [
        AuthService,
        PasswordService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates a new user by email and password', async () => {
    const email = generateRandomEmail();
    const password = generateRandomPassword();

    const token = await service.signup(email, password);
    expect(token).toBeDefined();
    expect(token.accessToken).toBeDefined();

    const user: User = await mockUsersService.findOneByEmail(email);

    expect(user).toBeDefined();
    expect(user.email).toBe(email);
    expect(user.password).not.toBe(password);
  });

  it('signin by email and password', async () => {
    const email = generateRandomEmail();
    const password = generateRandomPassword();

    const token = await service.signup(email, password);
    expect(token).toBeDefined();
    expect(token.accessToken).toBeDefined();

    const user: User = await mockUsersService.findOneByEmail(email);
    expect(user).toBeDefined();
    expect(user.email).toBe(email);
    expect(user.password).not.toBe(password);

    const newToken = await service.signin(email, password);
    expect(newToken).toBeDefined();
    expect(newToken.accessToken).toBeDefined();
  });
});
