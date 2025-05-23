import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Public_Key } from 'src/auth-guard/public_auth.guard';
// import { error } from 'console';
// import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private userServicer: UserService,
    private jwtServicer: JwtService,
    private reflector: Reflector,
  ) {}

  public async validate(email: string, password: string): Promise<any> {
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

  public async singIn(user: any) {
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

  public publicResource(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(
      Public_Key,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }
  }
}
