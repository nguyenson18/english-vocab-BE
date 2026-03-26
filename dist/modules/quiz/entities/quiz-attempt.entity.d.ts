import { Topic } from '../../topics/entities/topic.entity';
import { QuizAttemptDetail } from './quiz-attempt-detail.entity';
export declare class QuizAttempt {
    id: string;
    topicId: string;
    topic: Topic;
    quizType: string;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    score: number;
    details: QuizAttemptDetail[];
    createdAt: Date;
}
