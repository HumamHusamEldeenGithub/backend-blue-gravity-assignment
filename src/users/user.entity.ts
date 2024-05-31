import { ApiProperty } from '@nestjs/swagger';
import { Content } from '../contents/content.entity';
import { Rating } from '../ratings/rating.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty({ type: () => Content, isArray: true })
  @OneToMany(() => Content, (content) => content.user)
  contents: Content[];

  @ApiProperty({ type: () => Rating, isArray: true })
  @OneToMany(() => Rating, (rating) => rating)
  ratings: Rating[];
}
