import { Module } from '@nestjs/common';
import { userModule } from 'src/user/user.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constant';
import { JwtStrategy } from './auth.jwt.strategy';
// import { JwtAuthGuardValidate } from 'src/auth-guard/jwt-authValidateToken.guard';
// import { APP_GUARD } from '@nestjs/core';
// import { APP_GUARD } from '@nestjs/core';
// import { JwtAuthGuard } from './jwt.auth.guard';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserEntity } from 'src/user/entity/user.entity';

@Module({
  controllers: [AuthenticationController],
  imports: [
    userModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1200s' },
    }),
  ],
  providers: [
    AuthenticationService,
    LocalStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuardValidate,
    // },
    JwtStrategy,
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
