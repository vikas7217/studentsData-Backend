import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create.user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { UserLoginDto } from 'src/dto/user.login.dto';
import { UserLoginEntity } from 'src/entity/user.login.entity';
import { generateEmployeeId, generateUserId } from './constants';
// import { ChangePasswordDto } from '../dto/change.password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(UserLoginEntity)
    private userLoginRepo: Repository<UserLoginEntity>
  ) {}

  getAllUser(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async getUser(): Promise<UserLoginEntity[]> {
    const user = await this.userLoginRepo.find({
      where: { isActive: 1 },
    });
    return user;
  }
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
          generateRandomUserId = generateUserId()
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

      });

      this.createUserLogin({...newUser,userType:newUser.type})

      return this.usersRepository.save(newUser);
    } catch (error) {
      console.error(error);
      throw new error({message:'An error occurred while creating the user',error:error}); 
    }
  }

  async update(updateUserDto: UpdateUserDto, userId: number) {
    const existingUser = await this.usersRepository.findOne({
      where: { id: userId, isActive: 1 },
    });
    if (!existingUser) {
      throw new Error('User not found');
    }

    const updatedUser = { ...existingUser, ...updateUserDto };
    if (updateUserDto.isSuccess !== undefined) {
      updatedUser.isActive = 1;
    }
        await this.updateUserLogin({...updatedUser,userType:updatedUser.type})
    await this.usersRepository.save(updatedUser);
    return updatedUser;
  }

  getUserById(userId: number) {
    return this.usersRepository.findOne({
      where: { id: userId, isActive: 1 },
    });

  }

  async softDeleteUser(userId: number) {
    const userInLogin = await this.userLoginRepo.findOne({where:{id: userId}})
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    user.isActive = 0;
    userInLogin.isActive = 0;
    await this.usersRepository.save(user);
    await this.userLoginRepo.save(userInLogin)
    return { isSuccess: true, message: 'User soft-deleted successfully' };
  }

  public findUserEmail(email: string) {
    return this.userLoginRepo.findOne({ where: { email, isActive: 1 } });
  }

  async createUserLogin(newUser:UserLoginDto){
    
    try {
      const {
        id,
        email,
        userName,
        password,
        isActive,
        userType} = newUser

       newUser.employeeId = generateEmployeeId(id)
  
        const user = this.userLoginRepo.create({
          id:id,
          email:email,
          userName:userName,
          employeeId:newUser.employeeId,
          password:'',
          userType:userType,
          isActive:1,
          createdOn: new Date(),
          updatedOn:''
        })
      await this.userLoginRepo.save(user)
    } catch (error) {
      console.error(error);
      throw new error({message:'An error occurred while creating the user',error:error}); 
      }
  }

  async updateUserLogin(newUser:UserLoginDto){
    
    try {
      const {
        id,
        email,
        userName,
        password,
        isActive,
        userType} = newUser

        const employee = this.userLoginRepo.findOne({where:{id:id,isActive: 1}})
  
        // const user = this.userLoginRepo.create({
        //   id:id,
        //   email:email,
        //   userName:userName,
        //   employeeId:employee.employeeId,
        //   password:'',
        //   userType:userType,
        //   isActive:1,
        //   createdOn: new Date(),
        //   updatedOn:''
        // })

        const update = {...employee,...newUser}

        console.log(update,'==========')
      await this.userLoginRepo.save(update)
    } catch (error) {
      console.error(error);
      throw new error({message:'An error occurred while creating the user',error:error}); 
      }
  }
}
