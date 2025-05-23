import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Nullable } from 'src/config/config.service';

export class CreateUserDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  userName: Nullable<string>;

  @IsString()
  gender: Nullable<string>;

  @IsString()
  roll: Nullable<string>;

  @IsString()
  type: Nullable<string>;

  @IsOptional()
  @IsString()
  password: Nullable<string>;

  @IsString()
  age: Nullable<string>;

  @IsEmail()
  email: Nullable<string>;

  @IsString()
  phoneNumber: Nullable<string>;

  firstName: Nullable<string>;
  lastName: Nullable<string>;
  streetAddress1: Nullable<string>;
  streetAddress2: Nullable<string>;
  city: Nullable<string>;
  state: Nullable<string>;
  stateCode: Nullable<string>;
  pinCode: Nullable<string>;
  zipCode: Nullable<string>;
  country: Nullable<string>;
  countryCode: Nullable<string>;

  @IsOptional()
  @IsBoolean()
  isActive?: number; // Marked as optional
}
