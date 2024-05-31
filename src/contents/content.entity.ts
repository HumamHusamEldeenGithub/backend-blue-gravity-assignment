import { ApiProperty } from '@nestjs/swagger';
import { Rating } from '../ratings/rating.entity';
import { User } from '../users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum ContentCategory {
  GAME = 'game',
  VIDEO = 'video',
  ARTWORK = 'artwork',
  MUSIC = 'music',
}

@Entity()
export class Content {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  category: string;

  @ApiProperty()
  @Column()
  thumbnailUrl: string;

  @ApiProperty()
  @Column()
  contentUrl: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.contents, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @ApiProperty({ type: () => Rating, isArray: true })
  @OneToMany(() => Rating, (rating) => rating.content)
  ratings: Rating[];
}
