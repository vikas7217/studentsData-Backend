import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { userModule } from 'src/user/user.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { MailerController } from './mailer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';

@Module({
  controllers: [MailerController],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    userModule,
    AuthenticationModule,
  ],
  providers: [MailerService],
})
export class MailerModule {}
