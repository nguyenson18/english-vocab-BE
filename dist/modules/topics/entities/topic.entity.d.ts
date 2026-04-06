import { Conversation } from '../../conversations/entities/conversation.entity';
import { Passage } from '../../passages/entities/passage.entity';
import { QuizAttempt } from '../../quiz/entities/quiz-attempt.entity';
import { Vocabulary } from '../../vocabularies/entities/vocabulary.entity';
export declare class Topic {
    id: string;
    name: string;
    description?: string | null;
    color: string;
    vocabularies: Vocabulary[];
    conversations: Conversation[];
    passages: Passage[];
    quizAttempts: QuizAttempt[];
    createdAt: Date;
    updatedAt: Date;
}
