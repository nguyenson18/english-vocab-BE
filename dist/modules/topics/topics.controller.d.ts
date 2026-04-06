import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { TopicsService } from './topics.service';
export declare class TopicsController {
    private readonly topicsService;
    constructor(topicsService: TopicsService);
    create(createTopicDto: CreateTopicDto): Promise<import("./entities/topic.entity").Topic>;
    findAll(): Promise<import("./entities/topic.entity").Topic[]>;
    findOne(id: string): Promise<import("./entities/topic.entity").Topic>;
    update(id: string, updateTopicDto: UpdateTopicDto): Promise<import("./entities/topic.entity").Topic>;
    remove(id: string): Promise<{
        id: string;
    }>;
}
