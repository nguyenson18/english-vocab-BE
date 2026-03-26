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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVocabularyProgress = void 0;
const typeorm_1 = require("typeorm");
const vocabulary_entity_1 = require("../../vocabularies/entities/vocabulary.entity");
let UserVocabularyProgress = class UserVocabularyProgress {
};
exports.UserVocabularyProgress = UserVocabularyProgress;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserVocabularyProgress.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserVocabularyProgress.prototype, "vocabularyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vocabulary_entity_1.Vocabulary, (vocabulary) => vocabulary.progressRecords, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'vocabularyId' }),
    __metadata("design:type", vocabulary_entity_1.Vocabulary)
], UserVocabularyProgress.prototype, "vocabulary", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], UserVocabularyProgress.prototype, "correctCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], UserVocabularyProgress.prototype, "wrongCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, default: 'new' }),
    __metadata("design:type", String)
], UserVocabularyProgress.prototype, "masteryLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], UserVocabularyProgress.prototype, "lastResult", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], UserVocabularyProgress.prototype, "lastReviewedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], UserVocabularyProgress.prototype, "nextReviewAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserVocabularyProgress.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserVocabularyProgress.prototype, "updatedAt", void 0);
exports.UserVocabularyProgress = UserVocabularyProgress = __decorate([
    (0, typeorm_1.Entity)('user_vocabulary_progress'),
    (0, typeorm_1.Unique)(['vocabularyId'])
], UserVocabularyProgress);
//# sourceMappingURL=user-vocabulary-progress.entity.js.map