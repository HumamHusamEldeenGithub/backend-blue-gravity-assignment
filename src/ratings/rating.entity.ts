import { Content } from '../contents/content.entity';
import { User } from '../users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stars: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Content, (content) => content.id)
  content: Content;
}
