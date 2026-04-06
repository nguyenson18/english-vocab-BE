import { Repository } from 'typeorm';
import { CreateTopicDto } from './dto/create-topic.dto';
import { Topic } from './entities/topic.entity';
import { UpdateTopicDto } from './dto/update-topic.dto';
export declare class TopicsService {
    private readonly topicRepository;
    constructor(topicRepository: Repository<Topic>);
    create(createTopicDto: CreateTopicDto): Promise<Topic>;
    findAll(): Promise<Topic[]>;
    findOne(id: string): Promise<Topic>;
    update(id: string, updateTopicDto: UpdateTopicDto): Promise<Topic>;
    remove(id: string): Promise<{
        id: string;
    }>;
}
