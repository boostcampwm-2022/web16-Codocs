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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1092',
      database: 'api',
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
