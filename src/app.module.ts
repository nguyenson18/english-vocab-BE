import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicsModule } from './modules/topics/topics.module';
import { VocabulariesModule } from './modules/vocabularies/vocabularies.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { ProgressModule } from './modules/progress/progress.module';
import { Topic } from './modules/topics/entities/topic.entity';
import { Vocabulary } from './modules/vocabularies/entities/vocabulary.entity';
import { QuizAttempt } from './modules/quiz/entities/quiz-attempt.entity';
import { QuizAttemptDetail } from './modules/quiz/entities/quiz-attempt-detail.entity';
import { UserVocabularyProgress } from './modules/progress/entities/user-vocabulary-progress.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseUrl = config.get<string>('DATABASE_URL');
        return {
          url: databaseUrl || undefined,
          type: 'postgres',
          host: config.getOrThrow<string>('DB_HOST'),
          port: config.get<number>('DB_PORT', 5432),
          username: config.getOrThrow<string>('DB_USER'),
          password: config.getOrThrow<string>('DB_PASS'),
          database: config.getOrThrow<string>('DB_NAME'),
          entities: [
            Topic,
            Vocabulary,
            QuizAttempt,
            QuizAttemptDetail,
            UserVocabularyProgress,
          ],
          synchronize: true,
          logging: true,
          ssl:
            config.get<string>('DB_SSL') === 'true'
              ? { rejectUnauthorized: false }
              : false,
        }
      },
    }),
    TopicsModule,
    VocabulariesModule,
    QuizModule,
    ProgressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
