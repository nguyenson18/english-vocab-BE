import { Vocabulary } from '../../vocabularies/entities/vocabulary.entity';
export declare class UserVocabularyProgress {
    id: string;
    vocabularyId: string;
    vocabulary: Vocabulary;
    correctCount: number;
    wrongCount: number;
    masteryLevel: string;
    lastResult: string | null;
    lastReviewedAt: Date | null;
    nextReviewAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
