import { Repository } from 'typeorm';
import { QuizAttempt } from './entities/quiz-attempt.entity';
import { QuizAttemptDetail } from './entities/quiz-attempt-detail.entity';
import { StartQuizDto } from './dto/start-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { TopicsService } from '../topics/topics.service';
import { Vocabulary } from '../vocabularies/entities/vocabulary.entity';
import { ProgressService } from '../progress/progress.service';
export declare class QuizService {
    private readonly quizAttemptRepository;
    private readonly quizAttemptDetailRepository;
    private readonly vocabularyRepository;
    private readonly topicsService;
    private readonly progressService;
    constructor(quizAttemptRepository: Repository<QuizAttempt>, quizAttemptDetailRepository: Repository<QuizAttemptDetail>, vocabularyRepository: Repository<Vocabulary>, topicsService: TopicsService, progressService: ProgressService);
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
                attempt: QuizAttempt;
                vocabularyId: string;
                vocabulary: Vocabulary;
                questionText: string;
                correctAnswer: string;
                userAnswer?: string | null;
                isCorrect: boolean;
                createdAt: Date;
            } & QuizAttemptDetail)[];
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
    getHistory(): Promise<QuizAttempt[]>;
    getHistoryDetail(id: string): Promise<QuizAttempt>;
}
