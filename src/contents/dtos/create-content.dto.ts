import { IsEnum, IsString, IsUrl } from 'class-validator';
import { ContentCategory } from '../content.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContentDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'Category of the content ( game - video - artwork - music )',
  })
  @IsEnum(ContentCategory)
  category: ContentCategory;

  @ApiProperty()
  @IsUrl()
  thumbnailUrl: string;

  @ApiProperty()
  @IsUrl()
  contentUrl: string;
}
