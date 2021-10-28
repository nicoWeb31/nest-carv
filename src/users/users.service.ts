import { Injectable } from '@nestjs/common';
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

    findOne(id: number) {
        return this.repo.findOne({ id });
    }

    find(email : string) {
        return this.repo.findOne({email})
    }

    update() {}

    remove() {}
}
