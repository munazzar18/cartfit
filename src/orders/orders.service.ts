import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './orders.entity';
import { Repository } from 'typeorm';


@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Orders) private orderRepository: Repository<Orders>) { }

    async all() {
        await this.orderRepository.find()
    }



}
