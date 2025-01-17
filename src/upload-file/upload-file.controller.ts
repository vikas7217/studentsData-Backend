import {
  BadRequestException,
  Controller,
  Post,
  // UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadFileService } from './upload-file.service';
import { EmployeeTimeLogs } from 'src/dto/user_logs_data.dto';

@Controller('/upload-file')
export class UploadFileController {
  constructor(private uploadFileService: UploadFileService) {}

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files'))
  async userLogs(
    @UploadedFiles() files: Express.Multer.File[],
    employeeTimeLogs: EmployeeTimeLogs,
  ) {
    if (!files) {
      throw new Error('upload the file first');
    }
    try {
      const uploadFile = await this.uploadFileService.uploadUserLogs(
        files,
        employeeTimeLogs,
      );
      if (uploadFile) {
        return {
          message: 'File processed successfully',
          data: uploadFile,
        };
      } else {
        return {
          message: 'File ',
          data: uploadFile,
        };
      }
    } catch (error) {
      throw new BadRequestException('Error processing file: ' + error);
    }
  }
}
