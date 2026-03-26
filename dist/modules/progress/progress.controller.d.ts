import { ProgressService } from './progress.service';
export declare class ProgressController {
    private readonly progressService;
    constructor(progressService: ProgressService);
    getOverview(): Promise<{
        success: boolean;
        message: string;
        data: {
            totalWords: number;
            masteredWords: number;
            learningWords: number;
            totalCorrect: number;
            totalWrong: number;
            accuracyRate: number;
        };
    }>;
    getWrongWords(): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/user-vocabulary-progress.entity").UserVocabularyProgress[];
    }>;
    getReviewDue(): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/user-vocabulary-progress.entity").UserVocabularyProgress[];
    }>;
}
