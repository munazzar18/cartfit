
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private userService: UserService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<Role>('ROLES_KEY', context.getHandler())
        const request = context.switchToHttp().getRequest()
        if (request?.user) {
            const { id } = request.user
            const user = await this.userService.oneById(id)
            return roles.includes(user.roles)
        }
        return false
    }
}