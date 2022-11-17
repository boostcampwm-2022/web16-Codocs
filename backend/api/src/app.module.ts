import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DocumentController } from './document/document.controller';
import { DocumentService } from './document/document.service';
import { DocumentModule } from './document/document.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserdocumentModule } from './userdocument/userdocument.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    UserModule,
    DocumentModule,
    BookmarkModule,
    UserdocumentModule
  ],
  controllers: [AppController, DocumentController],
  providers: [AppService, DocumentService]
})
export class AppModule {}
