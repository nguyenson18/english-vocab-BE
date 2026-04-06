"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const quiz_attempt_entity_1 = require("./entities/quiz-attempt.entity");
const quiz_attempt_detail_entity_1 = require("./entities/quiz-attempt-detail.entity");
const topics_service_1 = require("../topics/topics.service");
const vocabulary_entity_1 = require("../vocabularies/entities/vocabulary.entity");
const progress_service_1 = require("../progress/progress.service");
let QuizService = class QuizService {
    constructor(quizAttemptRepository, quizAttemptDetailRepository, vocabularyRepository, topicsService, progressService) {
        this.quizAttemptRepository = quizAttemptRepository;
        this.quizAttemptDetailRepository = quizAttemptDetailRepository;
        this.vocabularyRepository = vocabularyRepository;
        this.topicsService = topicsService;
        this.progressService = progressService;
    }
    async startQuiz(startQuizDto) {
        await this.topicsService.findOne(startQuizDto.topicId);
        const vocabularies = await this.vocabularyRepository.find({
            where: { topicId: startQuizDto.topicId },
        });
        if (vocabularies.length === 0) {
            throw new common_1.NotFoundException('This topic has no vocabulary');
        }
        const shuffled = [...vocabularies].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, startQuizDto.limit || 10);
        return Promise.all(selected.map(async (item) => {
            const distractors = vocabularies
                .filter((vocabulary) => vocabulary.id !== item.id)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map((vocabulary) => vocabulary.vietnameseMeaning);
            const options = [...distractors, item.vietnameseMeaning].sort(() => Math.random() - 0.5);
            return {
                vocabularyId: item.id,
                englishWord: item.englishWord,
                correctAnswer: item.vietnameseMeaning,
                options,
            };
        }));
    }
    async submitQuiz(submitQuizDto) {
        await this.topicsService.findOne(submitQuizDto.topicId);
        const vocabularyIds = submitQuizDto.answers.map((answer) => answer.vocabularyId);
        const vocabularies = await this.vocabularyRepository.findBy({ id: (0, typeorm_2.In)(vocabularyIds) });
        const vocabularyMap = new Map(vocabularies.map((item) => [item.id, item]));
        let correctAnswers = 0;
        const detailsToSave = [];
        for (const answer of submitQuizDto.answers) {
            const vocabulary = vocabularyMap.get(answer.vocabularyId);
            if (!vocabulary) {
                continue;
            }
            const normalizedUserAnswer = answer.userAnswer.trim().toLowerCase();
            const normalizedCorrectAnswer = vocabulary.englishWord.trim().toLowerCase();
            const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;
            if (isCorrect) {
                correctAnswers += 1;
            }
            await this.progressService.updateVocabularyProgress(vocabulary.id, isCorrect);
            const detail = this.quizAttemptDetailRepository.create({
                vocabularyId: vocabulary.id,
                questionText: vocabulary.englishWord,
                correctAnswer: vocabulary.vietnameseMeaning,
                userAnswer: answer.userAnswer,
                isCorrect,
            });
            detailsToSave.push(detail);
        }
        const totalQuestions = detailsToSave.length;
        const wrongAnswers = totalQuestions - correctAnswers;
        const score = totalQuestions > 0
            ? Number(((correctAnswers / totalQuestions) * 100).toFixed(2))
            : 0;
        const attempt = await this.quizAttemptRepository.save(this.quizAttemptRepository.create({
            topicId: submitQuizDto.topicId,
            quizType: submitQuizDto.quizType || 'multiple_choice',
            totalQuestions,
            correctAnswers,
            wrongAnswers,
            score,
        }));
        const savedDetails = await this.quizAttemptDetailRepository.save(detailsToSave.map((item) => ({
            ...item,
            attemptId: attempt.id,
        })));
        return {
            attempt: {
                ...attempt,
                details: savedDetails,
            },
            summary: {
                totalQuestions,
                correctAnswers,
                wrongAnswers,
                score,
            },
        };
    }
    async getHistory() {
        return this.quizAttemptRepository.find({
            order: { createdAt: 'DESC' },
            relations: {
                topic: true,
            },
        });
    }
    async getHistoryDetail(id) {
        const attempt = await this.quizAttemptRepository.findOne({
            where: { id },
            relations: {
                topic: true,
                details: true,
            },
        });
        if (!attempt) {
            throw new common_1.NotFoundException('Quiz attempt not found');
        }
        return attempt;
    }
};
exports.QuizService = QuizService;
exports.QuizService = QuizService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quiz_attempt_entity_1.QuizAttempt)),
    __param(1, (0, typeorm_1.InjectRepository)(quiz_attempt_detail_entity_1.QuizAttemptDetail)),
    __param(2, (0, typeorm_1.InjectRepository)(vocabulary_entity_1.Vocabulary)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        topics_service_1.TopicsService,
        progress_service_1.ProgressService])
], QuizService);
//# sourceMappingURL=quiz.service.js.map