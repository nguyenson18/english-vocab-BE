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
exports.VocabulariesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vocabulary_entity_1 = require("./entities/vocabulary.entity");
const topics_service_1 = require("../topics/topics.service");
const cloudinary_service_1 = require("../../common/cloudinary/cloudinary.service");
let VocabulariesService = class VocabulariesService {
    constructor(vocabularyRepository, topicsService, cloudinaryService) {
        this.vocabularyRepository = vocabularyRepository;
        this.topicsService = topicsService;
        this.cloudinaryService = cloudinaryService;
    }
    async create(createVocabularyDto) {
        await this.topicsService.findOne(createVocabularyDto.topicId);
        const vocabulary = this.vocabularyRepository.create(createVocabularyDto);
        return this.vocabularyRepository.save(vocabulary);
    }
    async findAll(query) {
        const where = {};
        if (query.topicId) {
            where.topicId = query.topicId;
        }
        if (query.keyword) {
            return this.vocabularyRepository.find({
                where: [
                    {
                        ...where,
                        englishWord: (0, typeorm_2.ILike)(`%${query.keyword}%`),
                    },
                    {
                        ...where,
                        vietnameseMeaning: (0, typeorm_2.ILike)(`%${query.keyword}%`),
                    },
                ],
                order: { createdAt: 'DESC' },
                relations: { topic: true },
            });
        }
        return this.vocabularyRepository.find({
            where,
            order: { createdAt: 'DESC' },
            relations: { topic: true },
        });
    }
    async findOne(id) {
        const vocabulary = await this.vocabularyRepository.findOne({
            where: { id },
            relations: { topic: true },
        });
        if (!vocabulary) {
            throw new common_1.NotFoundException('Vocabulary not found');
        }
        return vocabulary;
    }
    async update(id, updateVocabularyDto) {
        const vocabulary = await this.findOne(id);
        if (updateVocabularyDto.topicId) {
            await this.topicsService.findOne(updateVocabularyDto.topicId);
        }
        Object.assign(vocabulary, updateVocabularyDto);
        return this.vocabularyRepository.save(vocabulary);
    }
    async remove(id) {
        const vocabulary = await this.findOne(id);
        if (vocabulary.imagePublicId) {
            await this.cloudinaryService.deleteImage(vocabulary.imagePublicId);
        }
        await this.vocabularyRepository.remove(vocabulary);
        return { id };
    }
    async findByTopic(topicId) {
        await this.topicsService.findOne(topicId);
        return this.vocabularyRepository.find({
            where: { topicId },
            order: { createdAt: 'DESC' },
        });
    }
    async uploadImage(id, file) {
        const vocabulary = await this.findOne(id);
        if (!file) {
            throw new common_1.BadRequestException('Image file is required');
        }
        if (!file.mimetype.startsWith('image/')) {
            throw new common_1.BadRequestException('Only image files are allowed');
        }
        if (file.size > 5 * 1024 * 1024) {
            throw new common_1.BadRequestException('Image size must be less than 5MB');
        }
        if (vocabulary.imagePublicId) {
            await this.cloudinaryService.deleteImage(vocabulary.imagePublicId);
        }
        const uploaded = await this.cloudinaryService.uploadImage(file);
        vocabulary.imageUrl = uploaded.secure_url;
        vocabulary.imagePublicId = uploaded.public_id;
        return this.vocabularyRepository.save(vocabulary);
    }
    async removeImage(id) {
        const vocabulary = await this.findOne(id);
        if (vocabulary.imagePublicId) {
            await this.cloudinaryService.deleteImage(vocabulary.imagePublicId);
        }
        vocabulary.imageUrl = null;
        vocabulary.imagePublicId = null;
        return this.vocabularyRepository.save(vocabulary);
    }
};
exports.VocabulariesService = VocabulariesService;
exports.VocabulariesService = VocabulariesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vocabulary_entity_1.Vocabulary)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        topics_service_1.TopicsService,
        cloudinary_service_1.CloudinaryService])
], VocabulariesService);
//# sourceMappingURL=vocabularies.service.js.map