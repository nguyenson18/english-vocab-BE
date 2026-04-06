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
exports.TopicsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const topic_entity_1 = require("./entities/topic.entity");
let TopicsService = class TopicsService {
    constructor(topicRepository) {
        this.topicRepository = topicRepository;
    }
    async create(createTopicDto) {
        const existing = await this.topicRepository.findOne({
            where: { name: createTopicDto.name },
        });
        if (existing) {
            throw new common_1.ConflictException('Topic name already exists');
        }
        const topic = this.topicRepository.create({
            ...createTopicDto,
            color: createTopicDto.color || '#1976d2',
        });
        return this.topicRepository.save(topic);
    }
    async findAll() {
        return this.topicRepository.find({
            order: { createdAt: 'DESC' },
            relations: {
                vocabularies: true,
                conversations: true,
                passages: true,
            },
        });
    }
    async findOne(id) {
        const topic = await this.topicRepository.findOne({
            where: { id },
            relations: {
                vocabularies: true,
                conversations: true,
                passages: true,
            },
        });
        if (!topic) {
            throw new common_1.NotFoundException('Topic not found');
        }
        return topic;
    }
    async update(id, updateTopicDto) {
        const topic = await this.findOne(id);
        Object.assign(topic, updateTopicDto);
        return this.topicRepository.save(topic);
    }
    async remove(id) {
        const topic = await this.findOne(id);
        await this.topicRepository.remove(topic);
        return { id };
    }
};
exports.TopicsService = TopicsService;
exports.TopicsService = TopicsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(topic_entity_1.Topic)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TopicsService);
//# sourceMappingURL=topics.service.js.map