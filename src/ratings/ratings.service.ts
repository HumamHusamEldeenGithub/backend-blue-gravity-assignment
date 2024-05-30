import { Injectable, NotFoundException } from '@nestjs/common';
import { Rating } from './rating.entity';
import { CreateRatingDto } from './dtos/create-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Content } from 'src/contents/content.entity';

@Injectable()
export class RatingsService {
  constructor(@InjectRepository(Rating) private repo: Repository<Rating>) {}

  create(user: User, ratingDto: CreateRatingDto) {
    const content = this.repo.create({
      user: user,
      content: { id: ratingDto.contentId } as Partial<Content>,
      stars: ratingDto.rating,
    });
    return this.repo.save(content);
  }

  async findOne(id: number) {
    if (!id) return null;

    const user = await this.repo.findOne({
      where: { id },
      relations: ['user', 'content'],
    });
    if (!user) {
      throw new NotFoundException('rating not found');
    }
    return user;
  }

  async findAll() {
    return this.repo.find({
      relations: ['user', 'content'],
    });
  }

  async findAllByUserId(userId: number) {
    if (!userId) return null;
    return this.repo.find({
      where: { user: { id: userId } },
      relations: ['user', 'content'],
    });
  }

  async findAllByContentId(contentId: number) {
    if (!contentId) return null;
    return this.repo.find({
      where: { content: { id: contentId } },
      relations: ['user', 'content'],
    });
  }

  async update(id: number, attrs: Partial<Rating>) {
    if (!id) return null;

    const rating = await this.repo.findOne({ where: { id } });
    if (!rating) {
      throw new NotFoundException('rating not found');
    }
    Object.assign(rating, attrs);
    return this.repo.save(rating);
  }

  async remove(id: number) {
    if (!id) return null;

    const rating = await this.repo.findOne({ where: { id } });
    if (!rating) {
      throw new NotFoundException('rating not found');
    }
    const res = await this.repo.remove(rating);
    return res;
  }
}
