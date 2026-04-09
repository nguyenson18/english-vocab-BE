import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Topic } from '../../topics/entities/topic.entity';
import { QuizAttemptDetail } from '../../quiz/entities/quiz-attempt-detail.entity';
import { UserVocabularyProgress } from '../../progress/entities/user-vocabulary-progress.entity';

@Entity('vocabularies')
export class Vocabulary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  topicId: string;

  @ManyToOne(() => Topic, (topic) => topic.vocabularies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'topicId' })
  topic: Topic;

  @Column({ type: 'varchar', length: 150 })
  englishWord: string;

  @Column({ type: 'varchar', length: 255 })
  vietnameseMeaning: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  pronunciation: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  partOfSpeech: string | null;

  @Column({ type: 'text', nullable: true })
  exampleEn: string | null;

  @Column({ type: 'text', nullable: true })
  exampleVi: string | null;

  @Column({ type: 'text', nullable: true })
  note: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imageUrl: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imagePublicId: string | null;

  @OneToMany(() => QuizAttemptDetail, (detail) => detail.vocabulary)
  quizAttemptDetails: QuizAttemptDetail[];

  @OneToMany(() => UserVocabularyProgress, (progress) => progress.vocabulary)
  progressRecords: UserVocabularyProgress[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}