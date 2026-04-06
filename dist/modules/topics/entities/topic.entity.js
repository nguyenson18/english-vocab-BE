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
exports.Topic = void 0;
const typeorm_1 = require("typeorm");
const conversation_entity_1 = require("../../conversations/entities/conversation.entity");
const passage_entity_1 = require("../../passages/entities/passage.entity");
const quiz_attempt_entity_1 = require("../../quiz/entities/quiz-attempt.entity");
const vocabulary_entity_1 = require("../../vocabularies/entities/vocabulary.entity");
let Topic = class Topic {
};
exports.Topic = Topic;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Topic.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, unique: true }),
    __metadata("design:type", String)
], Topic.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Topic.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, default: '#1976d2' }),
    __metadata("design:type", String)
], Topic.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vocabulary_entity_1.Vocabulary, (vocabulary) => vocabulary.topic),
    __metadata("design:type", Array)
], Topic.prototype, "vocabularies", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => conversation_entity_1.Conversation, (conversation) => conversation.topic),
    __metadata("design:type", Array)
], Topic.prototype, "conversations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => passage_entity_1.Passage, (passage) => passage.topic),
    __metadata("design:type", Array)
], Topic.prototype, "passages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => quiz_attempt_entity_1.QuizAttempt, (quizAttempt) => quizAttempt.topic),
    __metadata("design:type", Array)
], Topic.prototype, "quizAttempts", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Topic.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Topic.prototype, "updatedAt", void 0);
exports.Topic = Topic = __decorate([
    (0, typeorm_1.Entity)('topics')
], Topic);
//# sourceMappingURL=topic.entity.js.map