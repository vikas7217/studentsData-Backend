import { Module } from '@nestjs/common';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './user-profile.service';
import { userModule } from 'src/user/user.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';
// import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  controllers: [UserProfileController],
  imports: [userModule, AuthenticationModule],
  providers: [UserProfileService],
})
export class UserProfileModule {}
