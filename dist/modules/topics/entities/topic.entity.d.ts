import { Vocabulary } from '../../vocabularies/entities/vocabulary.entity';
import { QuizAttempt } from '../../quiz/entities/quiz-attempt.entity';
export declare class Topic {
    id: string;
    name: string;
    description?: string | null;
    color: string;
    vocabularies: Vocabulary[];
    quizAttempts: QuizAttempt[];
    createdAt: Date;
    updatedAt: Date;
}
