import {
  Body,
  Controller,
  Get,
  // Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendMailDto } from 'src/dto/send-otp.dto';
import { ChangePasswordDto } from 'src/dto/change.password.dto';
import { JwtAuthGuardValidate } from 'src/auth-guard/jwt-authValidateToken.guard';
import { ValidateOtpDto } from 'src/dto/validate-otp';
import { ForgotPasswordDto } from 'src/dto/forgot-password.dto';
import { Public } from 'src/auth-guard/public_auth.guard';

@Controller('login')
export class MailerController {
  constructor(private mailerServicer: MailerService) {}

  @Post('sendMailOtp')
  async sendMailOTP(@Body() sendMailOTP: SendMailDto) {
    const { sendTo, subject, otp } = sendMailOTP;
    const sendingMail = await this.mailerServicer.sendMail(
      sendTo,
      subject,
      otp,
    );
    // return sendingMail;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (sendingMail) {
          resolve(sendingMail);
        } else {
          reject();
        }
      }, 1000);
    });
  }

  @Post('verified/:email')
  async verifiedCode(
    @Param('email') email: string,
    @Body() validateOtpDto: ValidateOtpDto,
  ) {
    const res = await this.mailerServicer.validate(email, validateOtpDto.otp);

    // return { res };
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (res) {
          resolve(res);
        } else {
          reject();
        }
      }, 1000);
    });
  }

  @Put('new-password/:email')
  async forgotPassword(
    @Param('email') email: string,
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ) {
    const newPassword = await this.mailerServicer.forgotPass(
      forgotPasswordDto.newPassword,
      forgotPasswordDto.conformPassword,
      email,
    );

    // return newPassword;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (newPassword) {
          resolve(newPassword);
        } else {
          reject();
        }
      }, 1000);
    });
  }

  @UseGuards(JwtAuthGuardValidate)
  @Put('changePassword/:email')
  async changePassword(
    @Param('email') email: string,
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: any,
  ) {
    const changeUserPass = await this.mailerServicer.changePass(
      changePasswordDto.currentPassword,
      changePasswordDto.newPassword,
      changePasswordDto.conformPassword,
      req.user,
      email,
    );
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (changeUserPass) {
          resolve(changeUserPass);
        } else {
          reject();
        }
      }, 1000);
    });
  }

  @Get('validate/:email')
  @Public()
  async validateEmail(@Param('email') email: string): Promise<any> {
    const validate = await this.mailerServicer.findUserEmail(email);
    const password = validate?.password || '';
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!validate) {
            resolve({ isEmailExist: false, isPasswordExist: false });
          }
          if (validate && !password) {
            resolve({ isEmailExist: true, isPasswordExist: false });
          }
          if (validate && password) {
            resolve({ isEmailExist: true, isPasswordExist: true });
          }
        }, 2000);
      });
    } catch (error) {
      return {
        error,
        message: 'something went wrong',
      };
    }

    // return { isValidate: true };

    // return validate;
  }
}
