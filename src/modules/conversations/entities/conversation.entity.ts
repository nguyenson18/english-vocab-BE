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
import { ConversationLine } from './conversation-line.entity';

@Entity('conversations')
export class Conversation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    topicId: string;

    @ManyToOne(() => Topic, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'topicId' })
    topic: Topic;

    @Column({ type: 'varchar', length: 150 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string | null;

    @OneToMany(() => ConversationLine, (line) => line.conversation, {
        cascade: true,
    })
    lines: ConversationLine[];
    @ManyToOne(() => Topic, (topic) => topic.conversations, {
        onDelete: 'CASCADE',
    })

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}