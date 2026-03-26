import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from './entities/topic.entity';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}

  async create(createTopicDto: CreateTopicDto) {
    const existing = await this.topicRepository.findOne({
      where: { name: createTopicDto.name },
    });

    if (existing) {
      throw new ConflictException('Topic name already exists');
    }

    const topic = this.topicRepository.create({
      ...createTopicDto,
      color: createTopicDto.color || '#1976d2',
    });

    return this.topicRepository.save(topic);
  }

  async findAll() {
    return this.topicRepository.find({
      order: { createdAt: 'DESC' },
      relations: {
        vocabularies: true,
      },
    });
  }

  async findOne(id: string) {
    const topic = await this.topicRepository.findOne({
      where: { id },
      relations: {
        vocabularies: true,
      },
    });

    if (!topic) {
      throw new NotFoundException('Topic not found');
    }

    return topic;
  }

  async update(id: string, updateTopicDto: UpdateTopicDto) {
    const topic = await this.findOne(id);
    Object.assign(topic, updateTopicDto);
    return this.topicRepository.save(topic);
  }

  async remove(id: string) {
    const topic = await this.findOne(id);
    await this.topicRepository.remove(topic);
    return { id };
  }
}
