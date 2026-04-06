"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const conversation_entity_1 = require("./modules/conversations/entities/conversation.entity");
const conversation_line_entity_1 = require("./modules/conversations/entities/conversation-line.entity");
const conversations_module_1 = require("./modules/conversations/conversations.module");
const passage_entity_1 = require("./modules/passages/entities/passage.entity");
const passages_module_1 = require("./modules/passages/passages.module");
const user_vocabulary_progress_entity_1 = require("./modules/progress/entities/user-vocabulary-progress.entity");
const progress_module_1 = require("./modules/progress/progress.module");
const quiz_attempt_detail_entity_1 = require("./modules/quiz/entities/quiz-attempt-detail.entity");
const quiz_attempt_entity_1 = require("./modules/quiz/entities/quiz-attempt.entity");
const quiz_module_1 = require("./modules/quiz/quiz.module");
const topic_entity_1 = require("./modules/topics/entities/topic.entity");
const topics_module_1 = require("./modules/topics/topics.module");
const vocabulary_entity_1 = require("./modules/vocabularies/entities/vocabulary.entity");
const vocabularies_module_1 = require("./modules/vocabularies/vocabularies.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    const databaseUrl = config.get('DATABASE_URL');
                    return {
                        url: databaseUrl || undefined,
                        type: 'postgres',
                        host: config.getOrThrow('DB_HOST'),
                        port: config.get('DB_PORT', 5432),
                        username: config.getOrThrow('DB_USER'),
                        password: config.getOrThrow('DB_PASS'),
                        database: config.getOrThrow('DB_NAME'),
                        entities: [
                            topic_entity_1.Topic,
                            vocabulary_entity_1.Vocabulary,
                            conversation_entity_1.Conversation,
                            conversation_line_entity_1.ConversationLine,
                            passage_entity_1.Passage,
                            quiz_attempt_entity_1.QuizAttempt,
                            quiz_attempt_detail_entity_1.QuizAttemptDetail,
                            user_vocabulary_progress_entity_1.UserVocabularyProgress,
                        ],
                        synchronize: true,
                        logging: true,
                        ssl: config.get('DB_SSL') === 'true'
                            ? { rejectUnauthorized: false }
                            : false,
                    };
                },
            }),
            topics_module_1.TopicsModule,
            vocabularies_module_1.VocabulariesModule,
            conversations_module_1.ConversationsModule,
            passages_module_1.PassagesModule,
            quiz_module_1.QuizModule,
            progress_module_1.ProgressModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map