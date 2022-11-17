import { User } from '../user/user.entity';
import { UserDocument } from '../userdocument/userdocument.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  writer: User;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ name: 'is_deleted' })
  isDeleted: boolean;

  @OneToMany(() => UserDocument, (userDocument) => userDocument.document)
  userRelations: UserDocument[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
