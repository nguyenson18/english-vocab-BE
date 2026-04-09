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
exports.Vocabulary = void 0;
const typeorm_1 = require("typeorm");
const topic_entity_1 = require("../../topics/entities/topic.entity");
const quiz_attempt_detail_entity_1 = require("../../quiz/entities/quiz-attempt-detail.entity");
const user_vocabulary_progress_entity_1 = require("../../progress/entities/user-vocabulary-progress.entity");
let Vocabulary = class Vocabulary {
};
exports.Vocabulary = Vocabulary;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Vocabulary.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vocabulary.prototype, "topicId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => topic_entity_1.Topic, (topic) => topic.vocabularies, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'topicId' }),
    __metadata("design:type", topic_entity_1.Topic)
], Vocabulary.prototype, "topic", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], Vocabulary.prototype, "englishWord", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Vocabulary.prototype, "vietnameseMeaning", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Vocabulary.prototype, "pronunciation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", Object)
], Vocabulary.prototype, "partOfSpeech", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Vocabulary.prototype, "exampleEn", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Vocabulary.prototype, "exampleVi", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Vocabulary.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], Vocabulary.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Vocabulary.prototype, "imagePublicId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => quiz_attempt_detail_entity_1.QuizAttemptDetail, (detail) => detail.vocabulary),
    __metadata("design:type", Array)
], Vocabulary.prototype, "quizAttemptDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_vocabulary_progress_entity_1.UserVocabularyProgress, (progress) => progress.vocabulary),
    __metadata("design:type", Array)
], Vocabulary.prototype, "progressRecords", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Vocabulary.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Vocabulary.prototype, "updatedAt", void 0);
exports.Vocabulary = Vocabulary = __decorate([
    (0, typeorm_1.Entity)('vocabularies')
], Vocabulary);
//# sourceMappingURL=vocabulary.entity.js.map