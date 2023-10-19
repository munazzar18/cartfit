import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './orders.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './orderDto.dto';
import { User } from 'src/user/user.entity';
import { Products } from 'src/products/product.entity';


@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Orders) private orderRepository: Repository<Orders>) { }

    async all() {
        await this.orderRepository.find()
    }

    async create(createOrderDto: CreateOrderDto, authUser: User, product: Products) {
        const oneProduct = this.orderRepository.findOne({
            where: {
                productId: product.id
            }
        })
        if (oneProduct) {
            const order = this.orderRepository.create({
                ...createOrderDto,
                userId: authUser.id,
            })
            return await this.orderRepository.save(order)
        }
        throw new NotFoundException("No product found to order")
    }

}
