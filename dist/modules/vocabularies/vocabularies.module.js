"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabulariesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vocabulary_entity_1 = require("./entities/vocabulary.entity");
const vocabularies_service_1 = require("./vocabularies.service");
const vocabularies_controller_1 = require("./vocabularies.controller");
const topics_module_1 = require("../topics/topics.module");
let VocabulariesModule = class VocabulariesModule {
};
exports.VocabulariesModule = VocabulariesModule;
exports.VocabulariesModule = VocabulariesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([vocabulary_entity_1.Vocabulary]), topics_module_1.TopicsModule],
        controllers: [vocabularies_controller_1.VocabulariesController],
        providers: [vocabularies_service_1.VocabulariesService],
        exports: [vocabularies_service_1.VocabulariesService, typeorm_1.TypeOrmModule],
    })
], VocabulariesModule);
//# sourceMappingURL=vocabularies.module.js.map