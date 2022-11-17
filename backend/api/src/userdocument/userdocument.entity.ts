import { User } from '../user/user.entity';
import { Document } from '../document/document.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
  JoinColumn
} from 'typeorm';

@Entity()
export class UserDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Document)
  @JoinColumn({ name: 'document_id' })
  document: Document;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'last_visited' })
  lastVisited: Date;

  @Column({ default: false })
  editable: boolean;
}
