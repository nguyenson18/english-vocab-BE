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
exports.ProgressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_vocabulary_progress_entity_1 = require("./entities/user-vocabulary-progress.entity");
const vocabulary_entity_1 = require("../vocabularies/entities/vocabulary.entity");
let ProgressService = class ProgressService {
    constructor(progressRepository, vocabularyRepository) {
        this.progressRepository = progressRepository;
        this.vocabularyRepository = vocabularyRepository;
    }
    async updateVocabularyProgress(vocabularyId, isCorrect) {
        let progress = await this.progressRepository.findOne({
            where: { vocabularyId },
            relations: {
                vocabulary: {
                    topic: true,
                },
            },
        });
        if (!progress) {
            progress = this.progressRepository.create({
                vocabularyId,
                correctCount: 0,
                wrongCount: 0,
                masteryLevel: 'new',
            });
        }
        if (isCorrect) {
            progress.correctCount += 1;
            progress.lastResult = 'correct';
            if (progress.correctCount >= 5) {
                progress.masteryLevel = 'mastered';
            }
            else if (progress.correctCount >= 2) {
                progress.masteryLevel = 'learning';
            }
        }
        else {
            progress.wrongCount += 1;
            progress.lastResult = 'wrong';
            progress.masteryLevel = 'learning';
        }
        progress.lastReviewedAt = new Date();
        progress.nextReviewAt = new Date(Date.now() + (isCorrect ? 24 : 2) * 60 * 60 * 1000);
        return this.progressRepository.save(progress);
    }
    async getOverview() {
        const totalWords = await this.vocabularyRepository.count();
        const totalProgress = await this.progressRepository.find();
        const masteredWords = totalProgress.filter((item) => item.masteryLevel === 'mastered').length;
        const learningWords = totalProgress.filter((item) => item.masteryLevel === 'learning').length;
        const totalCorrect = totalProgress.reduce((sum, item) => sum + item.correctCount, 0);
        const totalWrong = totalProgress.reduce((sum, item) => sum + item.wrongCount, 0);
        return {
            totalWords,
            masteredWords,
            learningWords,
            totalCorrect,
            totalWrong,
            accuracyRate: totalCorrect + totalWrong > 0
                ? Number(((totalCorrect / (totalCorrect + totalWrong)) * 100).toFixed(2))
                : 0,
        };
    }
    async getWrongWords() {
        return this.progressRepository.find({
            where: {
                wrongCount: (0, typeorm_2.MoreThan)(0),
            },
            relations: {
                vocabulary: {
                    topic: true,
                },
            },
            order: {
                wrongCount: 'DESC',
                updatedAt: 'DESC',
            },
            take: 20,
        });
    }
    async getReviewDue() {
        return this.progressRepository.find({
            where: {
                nextReviewAt: (0, typeorm_2.LessThanOrEqual)(new Date()),
            },
            relations: {
                vocabulary: {
                    topic: true,
                },
            },
            order: {
                nextReviewAt: 'ASC',
            },
            take: 30,
        });
    }
};
exports.ProgressService = ProgressService;
exports.ProgressService = ProgressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_vocabulary_progress_entity_1.UserVocabularyProgress)),
    __param(1, (0, typeorm_1.InjectRepository)(vocabulary_entity_1.Vocabulary)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProgressService);
//# sourceMappingURL=progress.service.js.map