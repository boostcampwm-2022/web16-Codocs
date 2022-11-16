import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Document } from '../document/document.entity';
import { Bookmark } from '../bookmark/bookmark.entity';
import { UserDocument } from '../userdocument/userdocument.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ name: 'profile_url' })
  profileURL: string;

  @OneToMany(() => Document, (document) => document.writer)
  documents: Document[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[];

  @OneToMany(() => UserDocument, (userDocument) => userDocument.user)
  history: UserDocument[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
