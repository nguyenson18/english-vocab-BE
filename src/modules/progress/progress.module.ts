import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { UserVocabularyProgress } from './entities/user-vocabulary-progress.entity';
import { Vocabulary } from '../vocabularies/entities/vocabulary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserVocabularyProgress, Vocabulary])],
  controllers: [ProgressController],
  providers: [ProgressService],
  exports: [ProgressService, TypeOrmModule],
})
export class ProgressModule {}
