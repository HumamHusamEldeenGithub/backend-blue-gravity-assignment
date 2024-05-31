import { ApiProperty } from '@nestjs/swagger';
import { Content } from '../contents/content.entity';
import { User } from '../users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rating {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  stars: number;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @ApiProperty({ type: () => Content })
  @ManyToOne(() => Content, (content) => content.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  content: Content;
}
