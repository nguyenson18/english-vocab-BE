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
const vocabularies_service_1 = require("./vocabularies.service");
const create_vocabulary_dto_1 = require("./dto/create-vocabulary.dto");
const update_vocabulary_dto_1 = require("./dto/update-vocabulary.dto");
const query_vocabulary_dto_1 = require("./dto/query-vocabulary.dto");
let VocabulariesController = class VocabulariesController {
    constructor(vocabulariesService) {
        this.vocabulariesService = vocabulariesService;
    }
    async create(createVocabularyDto) {
        const data = await this.vocabulariesService.create(createVocabularyDto);
        return {
            success: true,
            message: 'Vocabulary created successfully',
            data,
        };
    }
    async findAll(query) {
        const data = await this.vocabulariesService.findAll(query);
        return {
            success: true,
            message: 'Vocabularies fetched successfully',
            data,
        };
    }
    async findByTopic(topicId) {
        const data = await this.vocabulariesService.findByTopic(topicId);
        return {
            success: true,
            message: 'Topic vocabularies fetched successfully',
            data,
        };
    }
    async findOne(id) {
        const data = await this.vocabulariesService.findOne(id);
        return {
            success: true,
            message: 'Vocabulary fetched successfully',
            data,
        };
    }
    async update(id, updateVocabularyDto) {
        const data = await this.vocabulariesService.update(id, updateVocabularyDto);
        return {
            success: true,
            message: 'Vocabulary updated successfully',
            data,
        };
    }
    async remove(id) {
        const data = await this.vocabulariesService.remove(id);
        return {
            success: true,
            message: 'Vocabulary deleted successfully',
            data,
        };
    }
};
exports.VocabulariesController = VocabulariesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vocabulary_dto_1.CreateVocabularyDto]),
    __metadata("design:returntype", Promise)
], VocabulariesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_vocabulary_dto_1.QueryVocabularyDto]),
    __metadata("design:returntype", Promise)
], VocabulariesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('topic/:topicId'),
    __param(0, (0, common_1.Param)('topicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VocabulariesController.prototype, "findByTopic", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VocabulariesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_vocabulary_dto_1.UpdateVocabularyDto]),
    __metadata("design:returntype", Promise)
], VocabulariesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VocabulariesController.prototype, "remove", null);
exports.VocabulariesController = VocabulariesController = __decorate([
    (0, common_1.Controller)('vocabularies'),
    __metadata("design:paramtypes", [vocabularies_service_1.VocabulariesService])
], VocabulariesController);
//# sourceMappingURL=vocabularies.controller.js.map