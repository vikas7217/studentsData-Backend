import {
  // Body,
  Controller,
  Post,
  // Put,
  // Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { JwtAuthGuard } from '../auth-guard/jwt.auth.guard';
import { Public } from 'src/auth-guard/public_auth.guard';
@Controller('/auth')
export class AuthenticationController {
  constructor(private authenticationServicer: AuthenticationService) {}
  @UseGuards(JwtAuthGuard)
  @Post('/login')
  @Public()
  public async authLogs(@Request() req: any) {
    const user = await this.authenticationServicer.singIn(req.user);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(user);
      }, 2000);
    });
  }

  // @UseGuards(JwtAuthGuardValidate)
  // @Put('/changePassword')
  // async changePassword(
  //   @Body() changePasswordDto: ChangePasswordDto,
  //   @Req() req: any,
  // ) {
  //   const changeUserPass = await this.userService.changePass(
  //     changePasswordDto,
  //     req.user,
  //   );
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (changeUserPass) {
  //         resolve(changeUserPass);
  //       } else {
  //         reject();
  //       }
  //     }, 1000);
  //   });
  // }

  //  change user Log Password
}
