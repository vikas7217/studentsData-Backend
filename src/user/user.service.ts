import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create.user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
// import { ChangePasswordDto } from '../dto/change.password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  getAllUser(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async getUser(): Promise<UserEntity[]> {
    const user = await this.usersRepository.find({
      where: { isSuccess: true },
    });

    return user;
  }

  // async create(
  //   createUserDto: CreateUserDto,
  //   @Query('userId') userId: number,
  //   @Query('email') email: string,
  // ) {
  //   try {
  //     const isUserIdExist = await this.usersRepository.findOne({
  //       where: { id: userId },
  //     });
  //     const isUserEmailExist = await this.usersRepository.findOne({
  //       where: { email: email },
  //     });
  //    
  //     if (isUserIdExist) {
  //       return {
  //         isSuccess: false,
  //         message: 'user with this User Id has already been Exist',
  //       };
  //     }
  //     if (!isUserEmailExist) {
  //       return {
  //         isSuccess: false,
  //         message: 'user with this User email has already been Exist',
  //       };
  //     }

  //     const newUser = this.usersRepository.create(createUserDto);
  //     return this.usersRepository.save(newUser);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async create(createUserDto: CreateUserDto) {
    const { id: userId, email: userEmail } = createUserDto;

    if (userId) {
      const isUserIdExist = await this.usersRepository.findOne({
        where: { id: userId },
      });
      if (isUserIdExist) {
        return {
          isSuccess: false,
          message: 'User with this user Id already exists',
        };
      }
    }

    // Check if email exists
    const isUserEmailExist = await this.usersRepository.findOne({
      where: { email: userEmail },
    });

    try {
      // Check if userId exists

      if (isUserEmailExist) {
        return {
          isSuccess: false,
          message: 'User with this email already exists',
        };
      }

      let generateRandomUserId = userId;
      if (!userId) {
        do {
          generateRandomUserId = Math.floor(Math.random() * 10000);
        } while (
          await this.usersRepository.findOne({
            where: { id: generateRandomUserId },
          })
        );
      }
      // Save new user

      const newUser = this.usersRepository.create({
        ...createUserDto,
        id: generateRandomUserId,
        password: '',
      });

      return this.usersRepository.save(newUser);

      // const newUser = this.usersRepository.create(createUserDto);
      // return this.usersRepository.save(newUser);
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while creating the user');
    }
  }

  async update(updateUserDto: UpdateUserDto, userId: number) {
    const existingUser = await this.usersRepository.findOne({
      where: { id: userId, isSuccess: true },
    });
    if (!existingUser) {
      throw new Error('User not found');
    }

    const updatedUser = { ...existingUser, ...updateUserDto };
    if (updateUserDto.isSuccess !== undefined) {
      updatedUser.isSuccess = true;
    }
    await this.usersRepository.save(updatedUser);
    return updatedUser;
  }

  getUserById(userId: number) {
    return this.usersRepository.findOne({
      where: { id: userId, isSuccess: true },
    });
  }

  async softDeleteUser(userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    user.isSuccess = false;
    await this.usersRepository.save(user);
    return { isSuccess: true, message: 'User soft-deleted successfully' };
  }

  findUserEmail(email: string) {
    return this.usersRepository.findOne({ where: { email, isSuccess: true } });
  }

  // async changePass(
  //   currentPassword: string,
  //   newPassword: string,
  //   user: any,
  //   email,
  // ) {
  //   const findUserEmail = await this.usersRepository.findOne({
  //     where: { email: email },
  //   });

  //   // const findUser = await this.usersRepository.findOne({
  //   //   where: { id: user.id },
  //   // });

  //   if (!findUserEmail) {
  //     throw new NotFoundException('User not found');
  //   }

  //   // const { currentPassword, newPassword } = changePasswordDto;

  //   if (findUserEmail.password !== currentPassword) {
  //     return {
  //       message: `Password doesn't match your current password. Try again.`,
  //     };
  //   }

  //   findUserEmail.password = newPassword;
  //   await this.usersRepository.save(findUserEmail);

  //   return { isSuccess: true, message: 'Password changed successfully' };
  // }
}
