import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { QuizAttempt } from './entities/quiz-attempt.entity';
import { QuizAttemptDetail } from './entities/quiz-attempt-detail.entity';
import { StartQuizDto } from './dto/start-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { TopicsService } from '../topics/topics.service';
import { Vocabulary } from '../vocabularies/entities/vocabulary.entity';
import { ProgressService } from '../progress/progress.service';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizAttempt)
    private readonly quizAttemptRepository: Repository<QuizAttempt>,
    @InjectRepository(QuizAttemptDetail)
    private readonly quizAttemptDetailRepository: Repository<QuizAttemptDetail>,
    @InjectRepository(Vocabulary)
    private readonly vocabularyRepository: Repository<Vocabulary>,
    private readonly topicsService: TopicsService,
    private readonly progressService: ProgressService,
  ) {}

  async startQuiz(startQuizDto: StartQuizDto) {
    await this.topicsService.findOne(startQuizDto.topicId);

    const vocabularies = await this.vocabularyRepository.find({
      where: { topicId: startQuizDto.topicId },
    });

    if (vocabularies.length === 0) {
      throw new NotFoundException('This topic has no vocabulary');
    }

    const shuffled = [...vocabularies].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, startQuizDto.limit || 10);

    return Promise.all(
      selected.map(async (item) => {
        const distractors = vocabularies
          .filter((vocabulary) => vocabulary.id !== item.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((vocabulary) => vocabulary.vietnameseMeaning);

        const options = [...distractors, item.vietnameseMeaning].sort(
          () => Math.random() - 0.5,
        );

        return {
          vocabularyId: item.id,
          englishWord: item.englishWord,
          correctAnswer: item.vietnameseMeaning,
          options,
        };
      }),
    );
  }

  async submitQuiz(submitQuizDto: SubmitQuizDto) {
    await this.topicsService.findOne(submitQuizDto.topicId);

    const vocabularyIds = submitQuizDto.answers.map((answer) => answer.vocabularyId);
    const vocabularies = await this.vocabularyRepository.findBy({ id: In(vocabularyIds) });

    const vocabularyMap = new Map(vocabularies.map((item) => [item.id, item]));

    let correctAnswers = 0;
    const detailsToSave: QuizAttemptDetail[] = [];

    for (const answer of submitQuizDto.answers) {
      const vocabulary = vocabularyMap.get(answer.vocabularyId);

      if (!vocabulary) {
        continue;
      }

      const normalizedUserAnswer = answer.userAnswer.trim().toLowerCase();
      const normalizedCorrectAnswer = vocabulary.vietnameseMeaning.trim().toLowerCase();
      const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;

      if (isCorrect) {
        correctAnswers += 1;
      }

      await this.progressService.updateVocabularyProgress(vocabulary.id, isCorrect);

      const detail = this.quizAttemptDetailRepository.create({
        vocabularyId: vocabulary.id,
        questionText: vocabulary.englishWord,
        correctAnswer: vocabulary.vietnameseMeaning,
        userAnswer: answer.userAnswer,
        isCorrect,
      });

      detailsToSave.push(detail);
    }

    const totalQuestions = detailsToSave.length;
    const wrongAnswers = totalQuestions - correctAnswers;
    const score =
      totalQuestions > 0
        ? Number(((correctAnswers / totalQuestions) * 100).toFixed(2))
        : 0;

    const attempt = await this.quizAttemptRepository.save(
      this.quizAttemptRepository.create({
        topicId: submitQuizDto.topicId,
        quizType: submitQuizDto.quizType || 'multiple_choice',
        totalQuestions,
        correctAnswers,
        wrongAnswers,
        score,
      }),
    );

    const savedDetails = await this.quizAttemptDetailRepository.save(
      detailsToSave.map((item) => ({
        ...item,
        attemptId: attempt.id,
      })),
    );

    return {
      attempt: {
        ...attempt,
        details: savedDetails,
      },
      summary: {
        totalQuestions,
        correctAnswers,
        wrongAnswers,
        score,
      },
    };
  }

  async getHistory() {
    return this.quizAttemptRepository.find({
      order: { createdAt: 'DESC' },
      relations: {
        topic: true,
      },
    });
  }

  async getHistoryDetail(id: string) {
    const attempt = await this.quizAttemptRepository.findOne({
      where: { id },
      relations: {
        topic: true,
        details: true,
      },
    });

    if (!attempt) {
      throw new NotFoundException('Quiz attempt not found');
    }

    return attempt;
  }
}
