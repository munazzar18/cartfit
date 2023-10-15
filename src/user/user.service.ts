import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from 'src/auth/registerUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>) { }

    async all() {
        return this.userRepository.find()
    }

    async oneById(id: number) {
        return this.userRepository.findOneBy({ id })
    }

    async oneByEmail(email: string) {
        return this.userRepository.findOneBy({ email })
    }

    async create(data: RegisterUserDto) {
        return this.userRepository.save(data)
    }

}

