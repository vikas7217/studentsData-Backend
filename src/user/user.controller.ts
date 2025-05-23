/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  // Patch,
  Post,
  Put,
  UseGuards,
  // Req,
  // UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create.user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { error } from 'console';
import { JwtAuthGuardValidate } from 'src/auth-guard/jwt-authValidateToken.guard';
// import { rejects } from 'assert';
// import { ChangePasswordDto } from '../dto/change.password.dto';
// import { JwtAuthGuardValidate } from '../auth-guard/jwt-authValidateToken.guard';

@Controller('/service')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('metaData')
  async getAllUsers() {
    const usersServicer = await this.userService.getAllUser();
    if (usersServicer) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ usersServicer, isSuccess: true });
        }, 2000);
      });
      // return { usersServicer, isSuccess: true };
    }
    return usersServicer;
  }
  @UseGuards(JwtAuthGuardValidate)
  @Get('my/filter')
  async getUsers() {
    const users = await this.userService.getUser();
    if (users) {
      const usersServicer = users.map((user) => {
        const {
          password,
          ...userDetails
        } = user;

        return userDetails;
      });
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ usersServicer, isSuccess: true });
        }, 2000);
      });
    }
    // return usersServicer;
  }

  @UseGuards(JwtAuthGuardValidate)
  @Post('create/user')
  async postUser(@Body() createUserDto: CreateUserDto) {
    const createUser = await this.userService.create(createUserDto);
    if (createUser) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ createUser, isSuccess: true });
        }, 2000);
      });
    }
    return;
  }

  @UseGuards(JwtAuthGuardValidate)
  @Put('update/userId=:userId')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    const update = await this.userService.update(updateUserDto, userId);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (update) {
          resolve({ update });
        }
        reject({ error });
      }, 2000);
    });
    // return update;
  }
  @UseGuards(JwtAuthGuardValidate)
  @Get('getBy/userId=:userId')
  async getUser(@Param('userId', ParseIntPipe) userId: number) {
    const users = await this.userService.getUserById(userId);
    if (users) {
      const {
        streetAddress1,
        streetAddress2,
        city,
        state,
        stateCode,
        pinCode,
        zipCode,
        country,
        countryCode,
        ...user
      } = users;
      const address = {
        streetAddress1,
        streetAddress2,
        city,
        state,
        stateCode,
        pinCode,
        zipCode,
        country,
        countryCode,
      };
      const employee = { ...user, address };
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (user) {
            resolve({ employee, isSuccess: true });
          }
          reject({ error });
        }, 2000);
      });
    }
  }

  @UseGuards(JwtAuthGuardValidate)
  @Put('removeUser/:userId')
  async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.softDeleteUser(userId);
  }

  @UseGuards(JwtAuthGuardValidate)
  @Get('useraccount/:userId')
  async getUserAccount(@Param('userId', ParseIntPipe) userId: number) {
    const users = await this.userService.getUserById(userId);
    if (users) {
      const {
        streetAddress1,
        streetAddress2,
        city,
        state,
        stateCode,
        pinCode,
        zipCode,
        country,
        countryCode,
        ...user
      } = users;
      const address = {
        streetAddress1,
        streetAddress2,
        city,
        state,
        stateCode,
        pinCode,
        zipCode,
        country,
        countryCode,
      };
      const userById = { ...user, address };
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (user) {
            resolve({ userById, isSuccess: true });
          }
          reject({ error });
        }, 2000);
      });
    }
  }
}
