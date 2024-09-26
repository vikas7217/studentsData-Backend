import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNumber()
  id: number;
  @IsOptional()
  @IsString()
  password: string;
  @IsString()
  userName: string;
  @IsString()
  roll: string;
  @IsString()
  type: string;
  @IsString()
  age: string;
  @IsString()
  gender: string;
  @IsString()
  phoneNumber: string;
  @IsEmail()
  email: string;
  firstName:string;
  lastName:string;
  streetAddress1:string;
  streetAddress2:string;
  city:string;
  state:string;
  stateCode:string;
  pinCode:string;
  zipCode:string;
  country:string;
  countryCode:string;
  @IsOptional()
  @IsBoolean()
  isSuccess: boolean;
}
