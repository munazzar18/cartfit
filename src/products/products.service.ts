import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './product.entity';
import { In, Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './productDto.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products) private productsRepository: Repository<Products>
    ) { }

    async allProducts(page: number) {
        const val = 10;
        const products = await this.productsRepository.find({
            order: {
                id: 'ASC'
            },
            skip: (page - 1) * val,
            take: (page * val)
        })
        return products
    }

    async filterByCategory(categoryIds: number[]) {
        const products = await this.productsRepository.find({
            where: {
                categoryId: In(categoryIds)
            }
        })
        if (products.length === 0) {
            throw new NotFoundException('No product found for this category')
        }
        else {
            return products
        }
    }

    async searchFilter(search: any) {
        const products = await this.productsRepository.createQueryBuilder().select()
            .where(`MATCH(title) AGAINST( '*${search}*' IN NATURAL LANGUAGE MODE )`)
            .orWhere(`MATCH(description) AGAINST( '*${search}*' IN NATURAL LANGUAGE MODE )`)
            .getMany()

        if (products.length === 0) {
            throw new NotFoundException(`No product found against ${search}`)
        }
        else {
            return products
        }
    }

    async productById(id: number) {
        const product = await this.productsRepository.findOneBy({ id })
        if (product) {
            return product
        }
        else {
            throw new NotFoundException(`Product not found for id: ${id}`)
        }
    }

    async create(createProductDto: CreateProductDto, authUser: User) {
        const product = this.productsRepository.create({
            ...createProductDto,
            userId: authUser.id,
        })
        return this.productsRepository.save(product)
    }
    async change(id: number, updateProductDto: UpdateProductDto, authUser: User) {
        const product = await this.productsRepository.findOne({
            where: {
                id: id,
                userId: authUser.id,
            }
        })
        if (!product) {
            throw new UnauthorizedException('You are not authorized to perform this action')
        }
        else {
            product.title = updateProductDto.title;
            product.description = updateProductDto.description;
            product.price = updateProductDto.price;
            product.images = updateProductDto.images;
            product.specification = updateProductDto.specification;
        }
    }
}
