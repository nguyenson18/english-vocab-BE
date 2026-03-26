import { VocabulariesService } from './vocabularies.service';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { QueryVocabularyDto } from './dto/query-vocabulary.dto';
export declare class VocabulariesController {
    private readonly vocabulariesService;
    constructor(vocabulariesService: VocabulariesService);
    create(createVocabularyDto: CreateVocabularyDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/vocabulary.entity").Vocabulary;
    }>;
    findAll(query: QueryVocabularyDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/vocabulary.entity").Vocabulary[];
    }>;
    findByTopic(topicId: string): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/vocabulary.entity").Vocabulary[];
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/vocabulary.entity").Vocabulary;
    }>;
    update(id: string, updateVocabularyDto: UpdateVocabularyDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/vocabulary.entity").Vocabulary;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
        };
    }>;
}
