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
exports.VocabulariesController = void 0;
const common_1 = require("@nestjs/common");
const response_message_decorator_1 = require("../../common/interceptors/response-message.decorator");
const create_vocabulary_dto_1 = require("./dto/create-vocabulary.dto");
const query_vocabulary_dto_1 = require("./dto/query-vocabulary.dto");
const update_vocabulary_dto_1 = require("./dto/update-vocabulary.dto");
const vocabularies_service_1 = require("./vocabularies.service");
let VocabulariesController = class VocabulariesController {
    constructor(vocabulariesService) {
        this.vocabulariesService = vocabulariesService;
    }
    create(createVocabularyDto) {
        return this.vocabulariesService.create(createVocabularyDto);
    }
    findAll(query) {
        return this.vocabulariesService.findAll(query);
    }
    findByTopic(topicId) {
        return this.vocabulariesService.findByTopic(topicId);
    }
    findOne(id) {
        return this.vocabulariesService.findOne(id);
    }
    update(id, updateVocabularyDto) {
        return this.vocabulariesService.update(id, updateVocabularyDto);
    }
    remove(id) {
        return this.vocabulariesService.remove(id);
    }
};
exports.VocabulariesController = VocabulariesController;
__decorate([
    (0, common_1.Post)(),
    (0, response_message_decorator_1.ResponseMessage)('Vocabulary created successfully'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vocabulary_dto_1.CreateVocabularyDto]),
    __metadata("design:returntype", void 0)
], VocabulariesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, response_message_decorator_1.ResponseMessage)('Vocabularies fetched successfully'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_vocabulary_dto_1.QueryVocabularyDto]),
    __metadata("design:returntype", void 0)
], VocabulariesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('topic/:topicId'),
    (0, response_message_decorator_1.ResponseMessage)('Topic vocabularies fetched successfully'),
    __param(0, (0, common_1.Param)('topicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VocabulariesController.prototype, "findByTopic", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, response_message_decorator_1.ResponseMessage)('Vocabulary fetched successfully'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VocabulariesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, response_message_decorator_1.ResponseMessage)('Vocabulary updated successfully'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_vocabulary_dto_1.UpdateVocabularyDto]),
    __metadata("design:returntype", void 0)
], VocabulariesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, response_message_decorator_1.ResponseMessage)('Vocabulary deleted successfully'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VocabulariesController.prototype, "remove", null);
exports.VocabulariesController = VocabulariesController = __decorate([
    (0, common_1.Controller)('vocabularies'),
    __metadata("design:paramtypes", [vocabularies_service_1.VocabulariesService])
], VocabulariesController);
//# sourceMappingURL=vocabularies.controller.js.map