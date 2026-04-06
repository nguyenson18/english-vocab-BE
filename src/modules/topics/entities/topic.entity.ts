import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Conversation } from '../../conversations/entities/conversation.entity';
import { Passage } from '../../passages/entities/passage.entity';
import { QuizAttempt } from '../../quiz/entities/quiz-attempt.entity';
import { Vocabulary } from '../../vocabularies/entities/vocabulary.entity';

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

  @OneToMany(() => Conversation, (conversation) => conversation.topic)
  conversations: Conversation[];

  @OneToMany(() => Passage, (passage) => passage.topic)
  passages: Passage[];

  @OneToMany(() => QuizAttempt, (quizAttempt) => quizAttempt.topic)
  quizAttempts: QuizAttempt[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
