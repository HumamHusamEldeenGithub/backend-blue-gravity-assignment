import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { ContentCategory } from '../content.entity';

export class UpdateContentDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(ContentCategory)
  @IsOptional()
  category: ContentCategory;

  @IsUrl()
  @IsOptional()
  thumbnailUrl: string;

  @IsUrl()
  @IsOptional()
  contentUrl: string;
}
