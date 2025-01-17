import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { userModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
// import { UserController } from './user/user.controller';
// import { AuthenticationController } from './authentication/authentication.controller';
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
// import { APP_GUARD } from '@nestjs/core';
// import { JwtAuthGuardValidate } from './auth-guard/jwt-authValidateToken.guard';

@Module({
  controllers: [
    AppController,
    UserProfileController,
    MailerController,
    UploadFileController,
  ],
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserLogsEntity]),
    userModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'nestjstest',
      entities: [UserEntity, UserLogsEntity],
      synchronize: true,
    }),
    ConfigModule.forRoot({}),
    AuthenticationModule,
    UserProfileModule,
    MailerModule,
    UploadFileModule,
  ],
  providers: [
    UserProfileService,
    MailerService,
    UploadFileService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuardValidate,
    // },
  ],
})
export class AppModule {}
