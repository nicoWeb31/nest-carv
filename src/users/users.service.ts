import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userCreateDto } from './dtos/create-user.dto';
import { User } from './entity/user.entity';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private repo: Repository<User>,
    ) {}

    create(user: userCreateDto) {
        const newUser = this.repo.create(user);
        return this.repo.save(newUser);
    }

    findOne(id: number): Promise<User> | null {
        return this.repo.findOne({ id });
    }

    find(email: string) {
        return this.repo.find({ email });
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        // const newUser = {
        //     ...user,
        //     ...attrs,
        // };
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async remove(id: number): Promise<User> {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return this.repo.remove(user);
    }
}
