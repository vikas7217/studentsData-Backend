import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { userModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';
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

@Module({
  controllers: [AppController, UserProfileController, MailerController],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    userModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'nestjstest',
      entities: [UserEntity],
      synchronize: true,
    }),
    ConfigModule.forRoot({}),
    AuthenticationModule,
    UserProfileModule,
    MailerModule,
  ],
  providers: [UserProfileService, MailerService],
})
export class AppModule {}
