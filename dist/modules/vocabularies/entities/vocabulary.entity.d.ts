import { Topic } from '../../topics/entities/topic.entity';
import { QuizAttemptDetail } from '../../quiz/entities/quiz-attempt-detail.entity';
import { UserVocabularyProgress } from '../../progress/entities/user-vocabulary-progress.entity';
export declare class Vocabulary {
    id: string;
    topicId: string;
    topic: Topic;
    englishWord: string;
    vietnameseMeaning: string;
    pronunciation: string | null;
    partOfSpeech: string | null;
    exampleEn: string | null;
    exampleVi: string | null;
    note: string | null;
    imageUrl: string | null;
    imagePublicId: string | null;
    quizAttemptDetails: QuizAttemptDetail[];
    progressRecords: UserVocabularyProgress[];
    createdAt: Date;
    updatedAt: Date;
}
