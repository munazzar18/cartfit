import { ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { serializedUser } from './user.entity';
import { sendJson } from 'src/helpers/helpers';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }


    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async getUsers() {
        const users = await this.userService.all()
        if (users.length > 0) {
            const allUsers = users.map((user => new serializedUser(user)))
            return sendJson(true, 'fetched all users successfully', allUsers)
        }
        else {
            throw new HttpException('No users found', HttpStatus.NOT_FOUND)
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/id/:id')
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        const userById = await this.userService.oneById(id)
        if (userById) {
            const user = new serializedUser(userById)
            return sendJson(true, 'user found for this id', user)
        }
        else {
            throw new NotFoundException('user not found for this id')
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/email/:email')
    async getUserByEmail(@Param('email') email: string) {
        const userbyEmail = await this.userService.oneByEmail(email)
        if (userbyEmail) {
            const user = new serializedUser(userbyEmail)
            return sendJson(true, 'user found for this email', user)
        }
        else {
            throw new NotFoundException('user not found for this email')
        }
    }

}
