import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Vocabulary } from './entities/vocabulary.entity';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { QueryVocabularyDto } from './dto/query-vocabulary.dto';
import { TopicsService } from '../topics/topics.service';

@Injectable()
export class VocabulariesService {
  constructor(
    @InjectRepository(Vocabulary)
    private readonly vocabularyRepository: Repository<Vocabulary>,
    private readonly topicsService: TopicsService,
  ) {}

  async create(createVocabularyDto: CreateVocabularyDto) {
    await this.topicsService.findOne(createVocabularyDto.topicId);
    const vocabulary = this.vocabularyRepository.create(createVocabularyDto);
    return this.vocabularyRepository.save(vocabulary);
  }

  async findAll(query: QueryVocabularyDto) {
    const where: Record<string, unknown> = {};

    if (query.topicId) {
      where.topicId = query.topicId;
    }

    if (query.keyword) {
      return this.vocabularyRepository.find({
        where: [
          {
            ...where,
            englishWord: ILike(`%${query.keyword}%`),
          },
          {
            ...where,
            vietnameseMeaning: ILike(`%${query.keyword}%`),
          },
        ],
        order: {
          createdAt: 'DESC',
        },
        relations: {
          topic: true,
        },
      });
    }

    return this.vocabularyRepository.find({
      where,
      order: {
        createdAt: 'DESC',
      },
      relations: {
        topic: true,
      },
    });
  }

  async findOne(id: string) {
    const vocabulary = await this.vocabularyRepository.findOne({
      where: { id },
      relations: {
        topic: true,
      },
    });

    if (!vocabulary) {
      throw new NotFoundException('Vocabulary not found');
    }

    return vocabulary;
  }

  async update(id: string, updateVocabularyDto: UpdateVocabularyDto) {
    const vocabulary = await this.findOne(id);

    if (updateVocabularyDto.topicId) {
      await this.topicsService.findOne(updateVocabularyDto.topicId);
    }

    Object.assign(vocabulary, updateVocabularyDto);
    return this.vocabularyRepository.save(vocabulary);
  }

  async remove(id: string) {
    const vocabulary = await this.findOne(id);
    await this.vocabularyRepository.remove(vocabulary);
    return { id };
  }

  async findByTopic(topicId: string) {
    await this.topicsService.findOne(topicId);

    return this.vocabularyRepository.find({
      where: { topicId },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
