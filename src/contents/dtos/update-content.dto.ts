import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { ContentCategory } from '../content.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContentDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsEnum(ContentCategory)
  @IsOptional()
  category: ContentCategory;

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  thumbnailUrl: string;

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  contentUrl: string;
}
