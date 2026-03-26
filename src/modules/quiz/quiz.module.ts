import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { QuizAttempt } from './entities/quiz-attempt.entity';
import { QuizAttemptDetail } from './entities/quiz-attempt-detail.entity';
import { Vocabulary } from '../vocabularies/entities/vocabulary.entity';
import { TopicsModule } from '../topics/topics.module';
import { ProgressModule } from '../progress/progress.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizAttempt, QuizAttemptDetail, Vocabulary]),
    TopicsModule,
    ProgressModule,
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
