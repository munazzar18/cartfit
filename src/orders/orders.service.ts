import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './orders.entity';
import { In, Repository } from 'typeorm';
import { CreateOrderDto } from './orderDto.dto';
import { User } from 'src/user/user.entity';
import { Products } from 'src/products/product.entity';


@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Orders) private orderRepository: Repository<Orders>,
        @InjectRepository(Products) private productRepository: Repository<Products>
    ) { }

    async all() {
        await this.orderRepository.find()
    }

    async create(createOrderDto: CreateOrderDto, authUser: User) {

        const oneProduct = await this.productRepository.findOne({
            where: {
                id: createOrderDto.productId,
            },
        });

        if (!oneProduct) {
            throw new NotFoundException(`Product with ID ${createOrderDto.productId} not found`);
        }

        const order = this.orderRepository.create({
            ...createOrderDto,
            userId: authUser.id,
        });

        order.products = [oneProduct];

        order.totalPrice = createOrderDto.quantity * oneProduct.price;

        return await this.orderRepository.save(order);
    }

}
