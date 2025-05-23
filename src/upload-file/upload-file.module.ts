import { Module } from '@nestjs/common';
import { UploadFileController } from './upload-file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { UploadFileService } from './upload-file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLogsEntity } from 'src/entity/user_logs.entity';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    TypeOrmModule.forFeature([UserLogsEntity]),
  ],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
