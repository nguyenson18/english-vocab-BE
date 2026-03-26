import { Repository } from 'typeorm';
import { Vocabulary } from './entities/vocabulary.entity';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { QueryVocabularyDto } from './dto/query-vocabulary.dto';
import { TopicsService } from '../topics/topics.service';
export declare class VocabulariesService {
    private readonly vocabularyRepository;
    private readonly topicsService;
    constructor(vocabularyRepository: Repository<Vocabulary>, topicsService: TopicsService);
    create(createVocabularyDto: CreateVocabularyDto): Promise<Vocabulary>;
    findAll(query: QueryVocabularyDto): Promise<Vocabulary[]>;
    findOne(id: string): Promise<Vocabulary>;
    update(id: string, updateVocabularyDto: UpdateVocabularyDto): Promise<Vocabulary>;
    remove(id: string): Promise<{
        id: string;
    }>;
    findByTopic(topicId: string): Promise<Vocabulary[]>;
}
