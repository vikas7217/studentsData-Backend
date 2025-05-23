import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { userModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserProfileController } from './user-profile/user-profile.controller';
import { UserProfileService } from './user-profile/user-profile.service';
import { UserProfileModule } from './user-profile/user-profile.module';
import { MailerController } from './mailer/mailer.controller';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import { MailerService } from './mailer/mailer.service';
import { UploadFileModule } from './upload-file/upload-file.module';
import { UserLogsEntity } from './entity/user_logs.entity';
import { UploadFileController } from './upload-file/upload-file.controller';
import { UploadFileService } from './upload-file/upload-file.service';
import { AppConfigService } from './config/config.service';
import { CacheModule } from '@nestjs/cache-manager';
import { AppConfigModule } from './config/config.module';
import { UserLoginEntity } from './entity/user.login.entity';

export class Connection {
  public static forRoot(): DynamicModule {
    return {
      module: Connection,
      global: true,
      imports: [
        AppConfigModule,
        TypeOrmModule.forRootAsync({
          imports: [AppConfigModule],
          useFactory: async (appConfigService: AppConfigService) => {
            return {
              type: 'mysql',
              host: appConfigService.get('HOST_NAME'),
              port: parseInt(appConfigService.get('DB_PORT')),
              username: appConfigService.get('USER_NAME'),
              password: appConfigService.get('DB_PASSWORD'),
              database: appConfigService.get('DB_NAME'),
              entities: [UserEntity, UserLogsEntity,UserLoginEntity],
              synchronize: true,
            };
          },
          inject: [AppConfigService],
        }),
      ],
    };
  }
}
@Module({
  controllers: [
    AppController,
    UserProfileController,
    MailerController,
    UploadFileController,
  ],
  imports: [
    userModule,
    ConfigModule.forRoot(),
    Connection.forRoot(),
    TypeOrmModule.forFeature([UserEntity, UserLogsEntity,UserLoginEntity]),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: '127.0.0.1',
    //   port: 3306,
    //   username: 'root',
    //   password: 'Method@hub123',
    //   database: 'nestjstest',
    //   entities: [UserEntity, UserLogsEntity],
    //   synchronize: true,
    // }),
    AuthenticationModule,
    UserProfileModule,
    MailerModule,
    UploadFileModule,
    CacheModule.register({
      isGlobal: true,
      max: 50,
      ttl: 60000, // 1 min
    }),
  ],
  providers: [UserProfileService, MailerService, UploadFileService],
})
export class AppModule {}
