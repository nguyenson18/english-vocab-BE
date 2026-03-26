import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { UserVocabularyProgress } from './entities/user-vocabulary-progress.entity';
import { Vocabulary } from '../vocabularies/entities/vocabulary.entity';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(UserVocabularyProgress)
    private readonly progressRepository: Repository<UserVocabularyProgress>,
    @InjectRepository(Vocabulary)
    private readonly vocabularyRepository: Repository<Vocabulary>,
  ) {}

  async updateVocabularyProgress(vocabularyId: string, isCorrect: boolean) {
    let progress = await this.progressRepository.findOne({
      where: { vocabularyId },
      relations: {
        vocabulary: {
          topic: true,
        },
      },
    });

    if (!progress) {
      progress = this.progressRepository.create({
        vocabularyId,
        correctCount: 0,
        wrongCount: 0,
        masteryLevel: 'new',
      });
    }

    if (isCorrect) {
      progress.correctCount += 1;
      progress.lastResult = 'correct';

      if (progress.correctCount >= 5) {
        progress.masteryLevel = 'mastered';
      } else if (progress.correctCount >= 2) {
        progress.masteryLevel = 'learning';
      }
    } else {
      progress.wrongCount += 1;
      progress.lastResult = 'wrong';
      progress.masteryLevel = 'learning';
    }

    progress.lastReviewedAt = new Date();
    progress.nextReviewAt = new Date(
      Date.now() + (isCorrect ? 24 : 2) * 60 * 60 * 1000,
    );

    return this.progressRepository.save(progress);
  }

  async getOverview() {
    const totalWords = await this.vocabularyRepository.count();
    const totalProgress = await this.progressRepository.find();
    const masteredWords = totalProgress.filter(
      (item) => item.masteryLevel === 'mastered',
    ).length;
    const learningWords = totalProgress.filter(
      (item) => item.masteryLevel === 'learning',
    ).length;
    const totalCorrect = totalProgress.reduce(
      (sum, item) => sum + item.correctCount,
      0,
    );
    const totalWrong = totalProgress.reduce(
      (sum, item) => sum + item.wrongCount,
      0,
    );

    return {
      totalWords,
      masteredWords,
      learningWords,
      totalCorrect,
      totalWrong,
      accuracyRate:
        totalCorrect + totalWrong > 0
          ? Number(((totalCorrect / (totalCorrect + totalWrong)) * 100).toFixed(2))
          : 0,
    };
  }

  async getWrongWords() {
    return this.progressRepository.find({
      where: {
        wrongCount: MoreThan(0),
      },
      relations: {
        vocabulary: {
          topic: true,
        },
      },
      order: {
        wrongCount: 'DESC',
        updatedAt: 'DESC',
      },
      take: 20,
    });
  }

  async getReviewDue() {
    return this.progressRepository.find({
      where: {
        nextReviewAt: LessThanOrEqual(new Date()),
      },
      relations: {
        vocabulary: {
          topic: true,
        },
      },
      order: {
        nextReviewAt: 'ASC',
      },
      take: 30,
    });
  }
}
