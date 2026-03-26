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
exports.QuizAttemptDetail = void 0;
const typeorm_1 = require("typeorm");
const quiz_attempt_entity_1 = require("./quiz-attempt.entity");
const vocabulary_entity_1 = require("../../vocabularies/entities/vocabulary.entity");
let QuizAttemptDetail = class QuizAttemptDetail {
};
exports.QuizAttemptDetail = QuizAttemptDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QuizAttemptDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QuizAttemptDetail.prototype, "attemptId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => quiz_attempt_entity_1.QuizAttempt, (attempt) => attempt.details, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'attemptId' }),
    __metadata("design:type", quiz_attempt_entity_1.QuizAttempt)
], QuizAttemptDetail.prototype, "attempt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QuizAttemptDetail.prototype, "vocabularyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vocabulary_entity_1.Vocabulary, (vocabulary) => vocabulary.quizAttemptDetails, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'vocabularyId' }),
    __metadata("design:type", vocabulary_entity_1.Vocabulary)
], QuizAttemptDetail.prototype, "vocabulary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], QuizAttemptDetail.prototype, "questionText", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], QuizAttemptDetail.prototype, "correctAnswer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], QuizAttemptDetail.prototype, "userAnswer", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], QuizAttemptDetail.prototype, "isCorrect", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QuizAttemptDetail.prototype, "createdAt", void 0);
exports.QuizAttemptDetail = QuizAttemptDetail = __decorate([
    (0, typeorm_1.Entity)('quiz_attempt_details')
], QuizAttemptDetail);
//# sourceMappingURL=quiz-attempt-detail.entity.js.map