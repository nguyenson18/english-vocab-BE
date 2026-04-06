import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    Index,
} from 'typeorm';
import { Conversation } from './conversation.entity';

@Entity('conversation_lines')
@Index(['conversationId', 'orderIndex'], { unique: true })
export class ConversationLine {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    conversationId: string;

    @ManyToOne(() => Conversation, (conversation) => conversation.lines, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'conversationId' })
    conversation: Conversation;

    @Column({ type: 'varchar', length: 100 })
    speaker: string;

    @Column({ type: 'int' })
    orderIndex: number;

    @Column({ type: 'text' })
    englishText: string;

    @Column({ type: 'text' })
    vietnameseText: string;

    @Column({ type: 'text', nullable: true })
    note: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}