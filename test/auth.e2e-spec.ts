import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  generateRandomEmail,
  generateRandomPassword,
} from '../src/utils/random-generator.util';
import { AuthDto } from '../src/auth/dtos/auth.dto';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signup', async () => {
    const email = generateRandomEmail();
    const password = generateRandomPassword();

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email,
        password,
      })
      .expect(201)
      .then((res) => {
        const token: AuthDto = res.body;
        expect(token).toBeDefined();
        expect(token.accessToken).toBeDefined();
      });
  });
});
