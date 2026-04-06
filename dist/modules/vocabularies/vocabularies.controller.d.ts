import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { QueryVocabularyDto } from './dto/query-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { VocabulariesService } from './vocabularies.service';
export declare class VocabulariesController {
    private readonly vocabulariesService;
    constructor(vocabulariesService: VocabulariesService);
    create(createVocabularyDto: CreateVocabularyDto): Promise<import("./entities/vocabulary.entity").Vocabulary>;
    findAll(query: QueryVocabularyDto): Promise<import("./entities/vocabulary.entity").Vocabulary[]>;
    findByTopic(topicId: string): Promise<import("./entities/vocabulary.entity").Vocabulary[]>;
    findOne(id: string): Promise<import("./entities/vocabulary.entity").Vocabulary>;
    update(id: string, updateVocabularyDto: UpdateVocabularyDto): Promise<import("./entities/vocabulary.entity").Vocabulary>;
    remove(id: string): Promise<{
        id: string;
    }>;
}
