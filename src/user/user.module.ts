import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserLoginEntity } from 'src/entity/user.login.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,UserLoginEntity])],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
})
export class userModule {}
