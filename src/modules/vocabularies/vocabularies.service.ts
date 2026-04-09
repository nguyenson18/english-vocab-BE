import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Vocabulary } from './entities/vocabulary.entity';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { QueryVocabularyDto } from './dto/query-vocabulary.dto';
import { TopicsService } from '../topics/topics.service';
import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';

@Injectable()
export class VocabulariesService {
  constructor(
    @InjectRepository(Vocabulary)
    private readonly vocabularyRepository: Repository<Vocabulary>,
    private readonly topicsService: TopicsService,
    private readonly cloudinaryService: CloudinaryService,
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
        order: { createdAt: 'DESC' },
        relations: { topic: true },
      });
    }

    return this.vocabularyRepository.find({
      where,
      order: { createdAt: 'DESC' },
      relations: { topic: true },
    });
  }

  async findOne(id: string) {
    const vocabulary = await this.vocabularyRepository.findOne({
      where: { id },
      relations: { topic: true },
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

    if (vocabulary.imagePublicId) {
      await this.cloudinaryService.deleteImage(vocabulary.imagePublicId);
    }

    await this.vocabularyRepository.remove(vocabulary);
    return { id };
  }

  async findByTopic(topicId: string) {
    await this.topicsService.findOne(topicId);

    return this.vocabularyRepository.find({
      where: { topicId },
      order: { createdAt: 'DESC' },
    });
  }

  async uploadImage(id: string, file: Express.Multer.File) {
    const vocabulary = await this.findOne(id);

    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Only image files are allowed');
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new BadRequestException('Image size must be less than 5MB');
    }

    if (vocabulary.imagePublicId) {
      await this.cloudinaryService.deleteImage(vocabulary.imagePublicId);
    }

    const uploaded = await this.cloudinaryService.uploadImage(file);

    vocabulary.imageUrl = uploaded.secure_url;
    vocabulary.imagePublicId = uploaded.public_id;

    return this.vocabularyRepository.save(vocabulary);
  }

  async removeImage(id: string) {
    const vocabulary = await this.findOne(id);

    if (vocabulary.imagePublicId) {
      await this.cloudinaryService.deleteImage(vocabulary.imagePublicId);
    }

    vocabulary.imageUrl = null;
    vocabulary.imagePublicId = null;

    return this.vocabularyRepository.save(vocabulary);
  }
}