import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SendMailDto {
  @IsString()
  sendTo: string;

  @IsString()
  subject: string;

  @IsOptional()
  @IsString()
  userText: number;

  @IsOptional()
  @IsNumber()
  otp: number;
}
