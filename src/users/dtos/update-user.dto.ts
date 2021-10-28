import { IsEmail, IsOptional, IsString } from 'class-validator';
import { User } from '../entity/user.entity';

export class UpdateUserDto implements Partial<User> {
    @IsEmail()
    @IsOptional()
    email: string;
    @IsOptional()
    @IsString()
    password: string;
}
