import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
export declare class TopicsController {
    private readonly topicsService;
    constructor(topicsService: TopicsService);
    create(createTopicDto: CreateTopicDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/topic.entity").Topic;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/topic.entity").Topic[];
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/topic.entity").Topic;
    }>;
    update(id: string, updateTopicDto: UpdateTopicDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/topic.entity").Topic;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
        };
    }>;
}
