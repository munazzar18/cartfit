import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { sendJson } from 'src/helpers/helpers';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.entity';

@Controller('orders')
export class OrdersController {

    constructor(
        private orderService: OrdersService
    ) { }

    @Get()
    async findAll() {
        const orders = await this.orderService.all()
        return sendJson(true, "all orders fetched successfully", orders)
    }



}
