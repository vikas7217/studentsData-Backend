import { Injectable } from '@nestjs/common';

@Injectable()
export class UserProfileService {
  async getUserprofile(req: any) {
    if (req) {
      return {
        isSuccess: true,
        userProfile: {
          id: req.id,
          userName: req.userName,
          roll: req.roll,
          type: req.type,
          age: req.age,
          email: req.email,
        },
      };
    } else {
      return { data: { ...req }, isSuccess: false, message: 'wrong password' };
    }
  }
}
