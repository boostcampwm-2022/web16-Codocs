import { Module } from '@nestjs/common';
import { UserdocumentService } from './userdocument.service';
import { UserdocumentController } from './userdocument.controller';

@Module({
  providers: [UserdocumentService],
  controllers: [UserdocumentController]
})
export class UserdocumentModule {}
