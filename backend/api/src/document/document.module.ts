import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './document.entity';
import { RedisModule } from 'src/redis/redis.module';
import { UserDocument } from 'src/userdocument/userdocument.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document, User, UserDocument]), RedisModule],
  providers: [DocumentService],
  controllers: [DocumentController]
})
export class DocumentModule {}
