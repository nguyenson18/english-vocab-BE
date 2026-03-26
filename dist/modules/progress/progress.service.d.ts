import { Repository } from 'typeorm';
import { UserVocabularyProgress } from './entities/user-vocabulary-progress.entity';
import { Vocabulary } from '../vocabularies/entities/vocabulary.entity';
export declare class ProgressService {
    private readonly progressRepository;
    private readonly vocabularyRepository;
    constructor(progressRepository: Repository<UserVocabularyProgress>, vocabularyRepository: Repository<Vocabulary>);
    updateVocabularyProgress(vocabularyId: string, isCorrect: boolean): Promise<UserVocabularyProgress>;
    getOverview(): Promise<{
        totalWords: number;
        masteredWords: number;
        learningWords: number;
        totalCorrect: number;
        totalWrong: number;
        accuracyRate: number;
    }>;
    getWrongWords(): Promise<UserVocabularyProgress[]>;
    getReviewDue(): Promise<UserVocabularyProgress[]>;
}
