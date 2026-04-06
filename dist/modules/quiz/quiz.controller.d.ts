import { StartQuizDto } from './dto/start-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { QuizService } from './quiz.service';
export declare class QuizController {
    private readonly quizService;
    constructor(quizService: QuizService);
    startQuiz(startQuizDto: StartQuizDto): Promise<{
        vocabularyId: string;
        englishWord: string;
        correctAnswer: string;
        options: string[];
    }[]>;
    submitQuiz(submitQuizDto: SubmitQuizDto): Promise<{
        attempt: {
            details: ({
                attemptId: string;
                id: string;
                attempt: import("./entities/quiz-attempt.entity").QuizAttempt;
                vocabularyId: string;
                vocabulary: import("../vocabularies/entities/vocabulary.entity").Vocabulary;
                questionText: string;
                correctAnswer: string;
                userAnswer?: string | null;
                isCorrect: boolean;
                createdAt: Date;
            } & import("./entities/quiz-attempt-detail.entity").QuizAttemptDetail)[];
            id: string;
            topicId: string;
            topic: import("../topics/entities/topic.entity").Topic;
            quizType: string;
            totalQuestions: number;
            correctAnswers: number;
            wrongAnswers: number;
            score: number;
            createdAt: Date;
        };
        summary: {
            totalQuestions: number;
            correctAnswers: number;
            wrongAnswers: number;
            score: number;
        };
    }>;
    getHistory(): Promise<import("./entities/quiz-attempt.entity").QuizAttempt[]>;
    getHistoryDetail(id: string): Promise<import("./entities/quiz-attempt.entity").QuizAttempt>;
}
