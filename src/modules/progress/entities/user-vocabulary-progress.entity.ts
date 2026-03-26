import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Vocabulary } from '../../vocabularies/entities/vocabulary.entity';

@Entity('user_vocabulary_progress')
@Unique(['vocabularyId'])
export class UserVocabularyProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  vocabularyId: string;

  @ManyToOne(() => Vocabulary, (vocabulary) => vocabulary.progressRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vocabularyId' })
  vocabulary: Vocabulary;

  @Column({ default: 0 })
  correctCount: number;

  @Column({ default: 0 })
  wrongCount: number;

  @Column({ length: 20, default: 'new' })
  masteryLevel: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  lastResult: string | null;

  @Column({ type: 'timestamp', nullable: true })
  lastReviewedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  nextReviewAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
