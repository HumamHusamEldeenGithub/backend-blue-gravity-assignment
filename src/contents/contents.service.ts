import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content, ContentCategory } from './content.entity';
import { Like, Repository } from 'typeorm';
import { CreateContentDto } from './dtos/create-content.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class ContentsService {
  constructor(@InjectRepository(Content) private repo: Repository<Content>) {}

  create(author: User, contentDto: CreateContentDto) {
    const content = this.repo.create(contentDto);
    content.user = author;
    return this.repo.save(content);
  }

  async findOne(id: number) {
    if (!id) return null;

    const user = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!user) {
      throw new NotFoundException('content not found');
    }
    return user;
  }

  async findAll() {
    return await this.repo.find({
      relations: ['user'],
    });
  }

  async findAllByTitle(title: string) {
    return this.repo.find({
      where: { title: Like(`%${title}%`) },
      relations: ['user'],
    });
  }

  findAllByCategory(category: ContentCategory) {
    return this.repo.find({ where: { category }, relations: ['user'] });
  }

  async update(id: number, attrs: Partial<Content>) {
    if (!id) return null;

    const content = await this.repo.findOne({ where: { id } });
    if (!content) {
      throw new NotFoundException('content not found');
    }
    Object.assign(content, attrs);
    return this.repo.save(content);
  }

  async remove(id: number) {
    if (!id) return null;

    const content = await this.repo.findOne({ where: { id } });
    if (!content) {
      throw new NotFoundException('content not found');
    }
    const res = await this.repo.remove(content);
    return res;
  }
}
