import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { error } from 'console';
// import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private userServicer: UserService,
    private jwtServicer: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<any> {
    try {
      const user = await this.userServicer.findUserEmail(email);

      if (user && user.password === password) {
        return user;
      } else {
        return { isSuccess: false, message: 'Incorrect Password' };
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  async singIn(user: any) {
    const payload = { ...user };
    if (user.isSuccess) {
      return {
        isSuccess: true,
        access_token: await this.jwtServicer.signAsync(payload),
        email: user.email,
        type: user.type,
        id: user.id,
        userName: user.userName,
      };
    } else {
      return {
        isSuccess: true,
        statusCode: 200,
        message: 'Incorrect Password',
      };
    }
  }
}
