import { Injectable } from '@nestjs/common';

import { parse } from 'csv-parse';
import * as XLSX from 'xlsx';
import { UserLogsEntity } from 'src/entity/user_logs.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { join } from 'path';
// import { buffer } from 'node:stream/consumers';
import { Readable } from 'typeorm/platform/PlatformTools';
import { EmployeeTimeLogs } from 'src/dto/user_logs_data.dto';

@Injectable()
export class UploadFileService {
  constructor(
    @InjectRepository(UserLogsEntity) // Inject your repository
    private readonly userLogsRepository: Repository<UserLogsEntity>,
  ) {}
  async uploadUserLogs(
    file: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    employeeTimeLogs: EmployeeTimeLogs,
  ): Promise<any> {
    if (!file) {
      throw new Error('upload the file first');
    }

    // const fileExtension = file.originalname.split('.').pop();
    const result = [];
    let logs = null;
    // if (file && Array.isArray(file)) {
    for (file of file) {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = file?.originalname;
      const uploadedTime = new Date();
      if (fileExtension === 'csv') {
        logs = await this.uploadCSV(file?.buffer, file);
        const fileData = { ...logs, fileName, uploadedTime };
        result.push(...fileData);
      }
      if (fileExtension === 'xlsx') {
        logs = await this.uploadXLSX(file?.buffer, file);
        const fileData = { ...logs };
        result.push(fileData);
      }
    }
    if (result !== undefined && result !== null && Array.isArray(result)) {
      const uploadedLogsData = result.flatMap((values) =>
        Object.values(values),
      );
      console.log(uploadedLogsData, 'array==============');
      const userLogs = await this.userLogsRepository.save(uploadedLogsData);
      return userLogs;
    }
  }
  private async uploadCSV(buffer: Buffer, file?: any): Promise<any[]> {
    const fileName = file?.originalname;
    const uploadedTime = new Date();
    const csvFile = new Promise<any>((resolve, reject) => {
      const result: any[] = [];
      const readeFile = new Readable();
      readeFile.push(buffer);
      readeFile.push(null);
      readeFile
        .pipe(parse())
        .on('data', (data: any) => result.push(data))
        .on('end', () => resolve(result))
        .on('error', (error) => reject(error)); // Correct error handling
    });
    return { ...csvFile, fileName, uploadedTime };
  }

  private async uploadXLSX(buffer: Buffer, file?: any): Promise<any[]> {
    const fileName = file?.originalname;
    const uploadedTime = new Date();
    const uploadedFileData = [];
    let fileData = null;
    let detailArray = null;
    const workBook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workBook.SheetNames[0];
    const workSheet = workBook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(workSheet, {
      // header: 1,
      raw: false,
      dateNF: 'dd-mm-yyyy',
    });
    // console.log(
    //   fileName,
    //   'fileName================',
    //   uploadedTime,
    //   'uploadedTime=========',
    // );
    for (fileData of jsonData) {
      // console.log({ ...fileData, fileName }, '111111111111111================');
      detailArray = { ...fileData, fileName, uploadedTime };
      uploadedFileData.push(detailArray);
    }

    return uploadedFileData;
  }
}
