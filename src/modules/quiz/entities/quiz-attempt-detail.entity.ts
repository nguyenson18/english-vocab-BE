import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuizAttempt } from './quiz-attempt.entity';
import { Vocabulary } from '../../vocabularies/entities/vocabulary.entity';

@Entity('quiz_attempt_details')
export class QuizAttemptDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  attemptId: string;

  @ManyToOne(() => QuizAttempt, (attempt) => attempt.details, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'attemptId' })
  attempt: QuizAttempt;

  @Column()
  vocabularyId: string;

  @ManyToOne(() => Vocabulary, (vocabulary) => vocabulary.quizAttemptDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vocabularyId' })
  vocabulary: Vocabulary;

  @Column({ type: 'text' })
  questionText: string;

  @Column({ type: 'text' })
  correctAnswer: string;

  @Column({ type: 'text', nullable: true })
  userAnswer?: string | null;

  @Column({ default: false })
  isCorrect: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
