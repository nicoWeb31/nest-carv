import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { userCreateDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto)

export class UsersController {
    constructor(private userService: UsersService) {}

    @Post('/signup')
    createUser(@Body() body: userCreateDto) {
        console.log(body);
        return this.userService.create(body);
    }

    // @UseInterceptors(new SerializeInterceptor(UserDto))
    // @Serialize(UserDto)
    @Get('/:id')
    async find(@Param('id') id: string): Promise<User> | null {
        const user = await this.userService.findOne(+id);
        if (!user) {
            throw new NotFoundException('no user');
        }

        return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.userService.find(email);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.remove(+id);
    }

    @Patch(':id')
    patchUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
        return this.userService.update(+id, data);
    }
}
