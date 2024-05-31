import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { ContentsModule } from './contents/contents.module';
import { RatingsModule } from './ratings/ratings.module';
import * as path from 'path';
import * as fs from 'fs';
import { User } from './users/user.entity';
import { Content } from './contents/content.entity';
import { Rating } from './ratings/rating.entity';

const envs = {
  PROD: 'PROD',
  DEV: 'DEV',
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const env = configService.get<string>('ENV'); // DEV - PROD
        const config = {
          type: 'postgres',
          host: configService.get<string>(`PG_HOST_${env}`),
          port: configService.get<number>(`PG_PORT_${env}`),
          username: configService.get<string>(`PG_USERNAME_${env}`),
          password: configService.get<string>(`PG_PASSWORD_${env}`),
          database: configService.get<string>(`PG_DB_${env}`),
          entities: [User, Content, Rating],
          synchronize: true,
        };

        if (env === envs.PROD) {
          Object.assign(config, {
            ssl: {
              rejectUnauthorized: true,
              ca: fs
                .readFileSync(
                  path.resolve(configService.get<string>(`PG_CA_PATH_${env}`)),
                )
                .toString(),
            },
          });
        }

        return config as TypeOrmModuleOptions;
      },
    }),
    UsersModule,
    AuthModule,
    ContentsModule,
    RatingsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
