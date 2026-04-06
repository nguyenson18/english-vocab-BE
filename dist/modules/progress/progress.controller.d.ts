import { ProgressService } from './progress.service';
export declare class ProgressController {
    private readonly progressService;
    constructor(progressService: ProgressService);
    getOverview(): Promise<{
        totalWords: number;
        masteredWords: number;
        learningWords: number;
        totalCorrect: number;
        totalWrong: number;
        accuracyRate: number;
    }>;
    getWrongWords(): Promise<import("./entities/user-vocabulary-progress.entity").UserVocabularyProgress[]>;
    getReviewDue(): Promise<import("./entities/user-vocabulary-progress.entity").UserVocabularyProgress[]>;
}
