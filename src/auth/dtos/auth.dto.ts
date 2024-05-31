import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AuthDto {
  @ApiProperty()
  @Expose()
  accessToken: string;
}
