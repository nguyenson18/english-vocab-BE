import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Topic } from '../../topics/entities/topic.entity';
import { QuizAttemptDetail } from './quiz-attempt-detail.entity';

@Entity('quiz_attempts')
export class QuizAttempt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  topicId: string;

  @ManyToOne(() => Topic, (topic) => topic.quizAttempts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'topicId' })
  topic: Topic;

  @Column({ length: 30, default: 'multiple_choice' })
  quizType: string;

  @Column({ default: 0 })
  totalQuestions: number;

  @Column({ default: 0 })
  correctAnswers: number;

  @Column({ default: 0 })
  wrongAnswers: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  score: number;

  @OneToMany(() => QuizAttemptDetail, (detail) => detail.attempt, {
    cascade: true,
  })
  details: QuizAttemptDetail[];

  @CreateDateColumn()
  createdAt: Date;
}
