import { Nullable } from 'src/config/config.service';

export declare enum UserType {
  SERVICE_ADMINISTRATOR = 'Admin',
}

export class UserLoginDto {
  id: number;
  email?: Nullable<string>;
  userName?: Nullable<string>;
  employeeId?: Nullable<string>;
  password?: Nullable<string>;
  isActive?: Nullable<number>;
  userType?: Nullable<string>;
  constructor(userLoginDto?: Partial<UserLoginDto>) {
    if (userLoginDto) {
      Object.assign(this, userLoginDto);
    }
  }
  // isUserAdmin() {
  //   return this.userType === UserType.SERVICE_ADMINISTRATOR;
  // }
}
