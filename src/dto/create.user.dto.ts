import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  userName: string;

  @IsString()
  gender: string;

  @IsString()
  roll: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsString()
  age: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  firstName: string;
  lastName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  state: string;
  stateCode: string;
  pinCode: string;
  zipCode: string;
  country: string;
  countryCode: string;

  @IsOptional()
  @IsBoolean()
  isSuccess?: boolean; // Marked as optional
}
