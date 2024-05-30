import { IsEnum, IsString, IsUrl } from 'class-validator';
import { ContentCategory } from '../content.entity';

export class CreateContentDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(ContentCategory)
  category: ContentCategory;

  @IsUrl()
  thumbnailUrl: string;

  @IsUrl()
  contentUrl: string;
}
