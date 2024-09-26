// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class JwtAuthGuard implements CanActivate {
//   constructor(private jwtService: JwtService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const authHeader = request.headers.authorization;

//     if (!authHeader) {
//       throw new UnauthorizedException('Authorization header is missing');
//     }

//     const [scheme, token] = authHeader.split(' ');

//     if (scheme !== 'Bearer' || !token) {
//       throw new UnauthorizedException('Invalid authorization format');
//     }

//     try {
//       const decoded = await this.jwtService.verifyAsync(token);
//       request.user = decoded; // Attach user data to request object if needed
//       return true;
//     } catch (error) {
//       throw new UnauthorizedException('Invalid or expired token');
//     }
//   }
// }
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuardValidate extends AuthGuard('jwt') {}
