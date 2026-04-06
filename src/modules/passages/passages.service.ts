import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TopicsService } from '../topics/topics.service';
import { CreatePassageDto } from './dto/create-passage.dto';
import { UpdatePassageDto } from './dto/update-passage.dto';
import { Passage } from './entities/passage.entity';

@Injectable()
export class PassagesService {
  constructor(
    @InjectRepository(Passage)
    private readonly passageRepository: Repository<Passage>,
    private readonly topicsService: TopicsService,
  ) {}

  async create(createPassageDto: CreatePassageDto) {
    await this.topicsService.findOne(createPassageDto.topicId);

    const passage = this.passageRepository.create({
      topicId: createPassageDto.topicId,
      title: createPassageDto.title,
      description: createPassageDto.description?.trim() || null,
      englishContent: createPassageDto.englishContent.trim(),
      vietnameseContent: createPassageDto.vietnameseContent.trim(),
    });

    return this.passageRepository.save(passage);
  }

  async findAll(topicId?: string) {
    return this.passageRepository.find({
      where: topicId ? { topicId } : {},
      relations: {
        topic: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string) {
    const passage = await this.passageRepository.findOne({
      where: { id },
      relations: {
        topic: true,
      },
    });

    if (!passage) {
      throw new NotFoundException('Passage not found');
    }

    return passage;
  }

  async update(id: string, updatePassageDto: UpdatePassageDto) {
    const passage = await this.findOne(id);

    if (updatePassageDto.topicId) {
      await this.topicsService.findOne(updatePassageDto.topicId);
    }

    Object.assign(passage, {
      ...updatePassageDto,
      description:
        updatePassageDto.description !== undefined
          ? updatePassageDto.description.trim() || null
          : passage.description,
      englishContent:
        updatePassageDto.englishContent !== undefined
          ? updatePassageDto.englishContent.trim()
          : passage.englishContent,
      vietnameseContent:
        updatePassageDto.vietnameseContent !== undefined
          ? updatePassageDto.vietnameseContent.trim()
          : passage.vietnameseContent,
    });

    return this.passageRepository.save(passage);
  }

  async remove(id: string) {
    const passage = await this.findOne(id);
    await this.passageRepository.remove(passage);
    return { id };
  }
}
