import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { sendJson } from 'src/helpers/helpers';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.entity';
import { CreateOrderDto } from './orderDto.dto';
import { Products } from 'src/products/product.entity';

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

    @Post()
    @UseGuards(AuthGuard)
    async createOrder(@Body() createOrderDto: CreateOrderDto, @Request() req) {
        const userId: User = req.user;
        const order = await this.orderService.create(createOrderDto, userId)
        return sendJson(true, "Order placed successfully", order)
    }

}
