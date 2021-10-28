import { IsEmail, IsString } from 'class-validator';

export class userCreateDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
