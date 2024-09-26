import { IsString } from 'class-validator';

export class ValidateOtpDto {
  @IsString()
  otp: number;
}
