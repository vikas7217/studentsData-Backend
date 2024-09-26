import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { from } from 'form-data';
import * as nodemailer from 'nodemailer';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MailerService {
  private transport: nodemailer.Transporter;
  private otpStorage: Map<string, { otp: string; createdAt: number }> =
    new Map();
  private readonly OTP_EXPIRATION_TIME = 2 * 60 * 1000;

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {
    this.transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'pvk2240@gmail.com',
        pass: 'gemg jiyj lgqb ceja',
      },
    });
  }

  createOTP() {
    let OTP = '';

    for (let i = 0; i < 4; i++) {
      OTP += Math.floor(Math.random() * 10);
    }
    return OTP;
  }

  async sendMail(sendTo: string, subject: string, otp?: number): Promise<any> {
    const isEmailExist = await this.usersRepository.findOne({
      where: { email: sendTo, isSuccess: true },
    });
    try {
      if (!isEmailExist) {
        return {
          isSuccess: false,
          message: 'user with this email dose not exist',
        };
      }
      const generateOtp = otp || this.createOTP();
      const newMail = {
        from: 'pvk2240@gmail.com',
        to: sendTo,
        subject: subject,
        text:
          'your one time verification code is' + ' ' + generateOtp.toString(),
      };

      this.transport.sendMail(newMail);

      this.otpStorage.set(sendTo, {
        otp: generateOtp.toString(),
        createdAt: Date.now(),
      });

      return { isSuccess: true, message: 'now you verify your otp' };
    } catch (error) {
      console.error('Error sending email', error);
    }
  }

  async validate(email: string, otp: number) {
    const validateOtp = this.otpStorage.get(email);

    if (!validateOtp) {
      return false;
    }
    if (Date.now() - validateOtp.createdAt > this.OTP_EXPIRATION_TIME) {
      return { isSuccess: false, message: 'OTP is expired. Try again' };
    }

    if (validateOtp.otp !== otp.toString()) {
      return {
        isSuccess: false,
        message: `OTP doesn't match. Enter Correct otp`,
      };
    }
    return {
      isSuccess: true,
      message: ` Your otp is  verified `,
    };
  }

  async forgotPass(newPassword: string, conformPassword: string, email) {
    const findUserEmail = await this.usersRepository.findOne({
      where: { email },
    });

    try {
      if (!findUserEmail) {
        return {
          isSuccess: false,
          message: `User with this email doesn't exist. Try again `,
        };
      }
      if (findUserEmail.password === newPassword) {
        return {
          isSuccess: false,
          message: ` This  Password is already taken by your current password. Please Change New Password.`,
        };
      }
      if (!conformPassword) {
        return {
          isSuccess: false,
          message: `Please enter conform password  exist. Try again `,
        };
      }
      if (newPassword !== conformPassword) {
        return {
          isSuccess: false,
          message: `conform password not matched with your new Password exist. Try again `,
        };
      }

      findUserEmail.password = newPassword;

      await this.usersRepository.save(findUserEmail);

      return {
        isSuccess: true,
        message: `Password changed successfully. Now you login`,
      };
    } catch (error) {
      console.error(error);
      return { error: error, message: 'something went wrong' };
    }
  }

  async changePass(
    currentPassword: string,
    newPassword: string,
    conformPassword: string,
    user: any,
    email,
  ) {
    const findUserEmail = await this.usersRepository.findOne({
      where: { email: email },
    });

    // const findUser = await this.usersRepository.findOne({
    //   where: { id: user.id },
    // });

    if (!findUserEmail) {
      throw new NotFoundException('User not found');
    }

    // const { currentPassword, newPassword } = changePasswordDto;

    if (findUserEmail.password !== currentPassword) {
      return {
        message: `Password doesn't match your current password. Try again.`,
      };
    }

    if (findUserEmail.password === newPassword) {
      return {
        message: ` This  Password is already taken by your current password. Please Change New Password.`,
      };
    }

    if (!conformPassword) {
      return {
        message: `First enter Conform Password.`,
      };
    }

    if (newPassword !== conformPassword) {
      return {
        message: `Conform Password doesn't match with your new password. Try again.`,
      };
    }

    findUserEmail.password = newPassword;
    await this.usersRepository.save(findUserEmail);

    return { isSuccess: true, message: 'Password changed successfully' };
  }

  findUserEmail(email: string) {
    return this.usersRepository.findOne({ where: { email, isSuccess: true } });
  }
}
