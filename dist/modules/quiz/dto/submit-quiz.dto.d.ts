declare class QuizAnswerItemDto {
    vocabularyId: string;
    userAnswer: string;
    isCorrect?: boolean;
}
export declare class SubmitQuizDto {
    topicId: string;
    quizType?: string;
    answers: QuizAnswerItemDto[];
}
export {};
