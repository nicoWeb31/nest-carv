import { Body, Controller, Get, Post } from '@nestjs/common';
import { userCreateDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post('/signup')
    createUser(@Body() body: userCreateDto) {
        console.log(body);
        return this.userService.create(body);
    }

    @Get('/signup')
    getUser() {
        console.log('user work');
    }
}
