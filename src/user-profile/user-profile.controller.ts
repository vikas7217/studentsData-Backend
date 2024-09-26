import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { JwtAuthGuardValidate } from '../auth-guard/jwt-authValidateToken.guard';

@Controller('/profile')
export class UserProfileController {
  constructor(private userProfile: UserProfileService) {}

  @UseGuards(JwtAuthGuardValidate)
  @Get('/user')
  async profile(@Request() req: any) {
    const profile = await this.userProfile.getUserprofile(req.user);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (profile) {
          resolve({ profile });
        }
        reject({});
      }, 2000);
    });
  }
}
