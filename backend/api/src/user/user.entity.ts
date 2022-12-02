import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  Unique,
  DeleteDateColumn
} from 'typeorm';
import { Bookmark } from '../bookmark/bookmark.entity';
import { UserDocument } from '../userdocument/userdocument.entity';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ name: 'profile_url' })
  profileURL: string;

  // @OneToMany(() => Document, (document) => document.writer)
  // documents: Document[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[];

  @OneToMany(() => UserDocument, (userDocument) => userDocument.user)
  documentRelations: UserDocument[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', default: null })
  deletedAt: Date;
}
