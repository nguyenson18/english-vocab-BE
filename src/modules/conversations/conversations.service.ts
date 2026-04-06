import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { TopicsService } from '../topics/topics.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation } from './entities/conversation.entity';
import { ConversationLine } from './entities/conversation-line.entity';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @InjectRepository(ConversationLine)
    private readonly lineRepository: Repository<ConversationLine>,
    private readonly topicsService: TopicsService,
    private readonly dataSource: DataSource,
  ) {}

  async create(createConversationDto: CreateConversationDto) {
    await this.topicsService.findOne(createConversationDto.topicId);

    return this.dataSource.transaction(async (manager) => {
      const conversationRepo = manager.getRepository(Conversation);
      const lineRepo = manager.getRepository(ConversationLine);

      const conversation = conversationRepo.create({
        topicId: createConversationDto.topicId,
        title: createConversationDto.title,
        description: createConversationDto.description || null,
      });

      const savedConversation = await conversationRepo.save(conversation);

      const lines = createConversationDto.lines.map((line) =>
        lineRepo.create({
          ...line,
          conversationId: savedConversation.id,
          note: line.note || null,
        }),
      );

      await lineRepo.save(lines);

      return conversationRepo.findOne({
        where: { id: savedConversation.id },
        relations: {
          topic: true,
          lines: true,
        },
        order: {
          lines: {
            orderIndex: 'ASC',
          },
        },
      });
    });
  }

  async findAll(topicId?: string) {
    const where = topicId ? { topicId } : {};

    return this.conversationRepository.find({
      where,
      relations: {
        topic: true,
        lines: true,
      },
      order: {
        createdAt: 'DESC',
        lines: {
          orderIndex: 'ASC',
        },
      },
    });
  }

  async findOne(id: string) {
    const conversation = await this.conversationRepository.findOne({
      where: { id },
      relations: {
        topic: true,
        lines: true,
      },
      order: {
        lines: {
          orderIndex: 'ASC',
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    return conversation;
  }

  async update(id: string, updateConversationDto: UpdateConversationDto) {
    const conversation = await this.findOne(id);

    if (updateConversationDto.topicId) {
      await this.topicsService.findOne(updateConversationDto.topicId);
    }

    return this.dataSource.transaction(async (manager) => {
      const conversationRepo = manager.getRepository(Conversation);
      const lineRepo = manager.getRepository(ConversationLine);

      Object.assign(conversation, {
        topicId: updateConversationDto.topicId ?? conversation.topicId,
        title: updateConversationDto.title ?? conversation.title,
        description:
          updateConversationDto.description ?? conversation.description,
      });

      await conversationRepo.save(conversation);

      if (updateConversationDto.lines) {
        await lineRepo.delete({ conversationId: conversation.id });

        const newLines = updateConversationDto.lines.map((line) =>
          lineRepo.create({
            ...line,
            conversationId: conversation.id,
            note: line.note || null,
          }),
        );

        await lineRepo.save(newLines);
      }

      return conversationRepo.findOne({
        where: { id: conversation.id },
        relations: {
          topic: true,
          lines: true,
        },
        order: {
          lines: {
            orderIndex: 'ASC',
          },
        },
      });
    });
  }

  async remove(id: string) {
    const conversation = await this.findOne(id);
    await this.conversationRepository.remove(conversation);
    return { id };
  }
}