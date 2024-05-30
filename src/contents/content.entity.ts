import { Rating } from 'src/ratings/rating.entity';
import { User } from 'src/users/user.entity';
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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  thumbnailUrl: string;

  @Column()
  contentUrl: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.contents)
  user: User;

  @OneToMany(() => Rating, (rating) => rating.content)
  ratings: Rating[];
}
