import { User } from '../user/user.entity';
import { Document } from '../document/document.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
  JoinColumn,
  UpdateDateColumn,
  Unique
} from 'typeorm';
import { UserRole } from './enum/role.enum';

@Entity()
@Unique(['user', 'document'])
export class UserDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Document)
  @JoinColumn({ name: 'document_id' })
  document: Document;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'last_visited' })
  lastVisited: Date;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.VIEWER })
  role: UserRole;

  setDocument(document: Document) {
    this.document = document;
  }

  getUser(): User {
    return this.user;
  }
}
