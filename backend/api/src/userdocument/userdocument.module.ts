import { Module } from '@nestjs/common';
import { UserDocumentService } from './userdocument.service';
import { UserdocumentController } from './userdocument.controller';
import { UserDocument } from './userdocument.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserDocument])],
  providers: [UserDocumentService],
  controllers: [UserdocumentController]
})
export class UserdocumentModule {}
