import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { comparePass, encodedPass } from './bcrypt';
import { serializedUser } from 'src/user/user.entity';
import { RegisterUserDto } from './registerUser.dto';
import { Role } from 'src/roles/role.enum';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string) {
        const userdb = await this.userService.oneByEmail(email)
        if (userdb) {
            const matched = comparePass(password, userdb.password)
            if (matched) {
                return new serializedUser(userdb)
            }
            else {
                throw new UnauthorizedException('Invalid Password')
            }
        }
        else {
            throw new UnauthorizedException('Invalid Email')
        }
    }
    async login(user: any) {
        const payload = {
            email: user.email,
            id: user.id,
            username: user.firstName,
            role: user.roles,
        }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async register(data: RegisterUserDto) {
        const userdb = await this.userService.oneByEmail(data.email)
        if (userdb) {
            throw new HttpException('user with this email already exists', HttpStatus.CONFLICT)
        }
        const password = encodedPass(data.password);
        if (Object.values(Role).includes(data.role)) {
            const newUser = await this.userService.create({ ...data, password, role: data.role });
            const payload = {
                email: newUser.email,
                id: newUser.id,
                username: newUser.firstName,
                role: newUser.roles,
            };

            return {
                access_token: this.jwtService.sign(payload)
            };
        } else {
            throw new HttpException('Invalid role provided', HttpStatus.BAD_REQUEST);
        }
    }
}


