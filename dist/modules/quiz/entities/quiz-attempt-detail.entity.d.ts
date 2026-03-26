import { QuizAttempt } from './quiz-attempt.entity';
import { Vocabulary } from '../../vocabularies/entities/vocabulary.entity';
export declare class QuizAttemptDetail {
    id: string;
    attemptId: string;
    attempt: QuizAttempt;
    vocabularyId: string;
    vocabulary: Vocabulary;
    questionText: string;
    correctAnswer: string;
    userAnswer?: string | null;
    isCorrect: boolean;
    createdAt: Date;
}
