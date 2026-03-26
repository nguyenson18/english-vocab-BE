import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Vocabulary } from '../../vocabularies/entities/vocabulary.entity';
import { QuizAttempt } from '../../quiz/entities/quiz-attempt.entity';

@Entity('topics')
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ length: 20, default: '#1976d2' })
  color: string;

  @OneToMany(() => Vocabulary, (vocabulary) => vocabulary.topic)
  vocabularies: Vocabulary[];

  @OneToMany(() => QuizAttempt, (quizAttempt) => quizAttempt.topic)
  quizAttempts: QuizAttempt[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
