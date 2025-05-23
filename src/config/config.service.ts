import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const databaseConfig = {
  HOST_NAME: '127.0.0.1',
  DB_PORT: '3306',
  USER_NAME: 'root',
  DB_PASSWORD: 'Meth0dhub123',
  DB_NAME: 'nestjstest',
};

export type Nullable<T> = T | null;

@Injectable()
export class AppConfigService {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {}
  get(key: string): string | undefined {
    return process.env[key] || this.configService.get(key);
  }
  getDbAccess(key: keyof typeof databaseConfig): string | undefined {
    return databaseConfig[key];
  }
}
