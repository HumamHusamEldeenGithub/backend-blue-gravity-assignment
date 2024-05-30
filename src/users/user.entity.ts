import { Content } from 'src/contents/content.entity';
import { Rating } from 'src/ratings/rating.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Content, (content) => content.user)
  contents: Content[];

  @OneToMany(() => Rating, (rating) => rating)
  ratings: Rating[];
}
