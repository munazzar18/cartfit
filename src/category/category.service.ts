import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './createCategoryDto.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>
    ) { }

    async all() {
        return this.categoryRepository.find()
    }

    async byId(id: number) {
        const category = await this.categoryRepository.findOneBy({ id })
        return category
    }

    async create(createCategoryDto: CreateCategoryDto) {
        const category = this.categoryRepository.create(createCategoryDto)
        return this.categoryRepository.save(category)
    }

    async change(id: number, updateCategory: UpdateCategoryDto) {
        const category = await this.categoryRepository.findOneBy({ id })
        if (category) {
            category.category = updateCategory.category
            return this.categoryRepository.save(category)
        }
        else {
            throw new NotFoundException('category for this id not found')
        }

    }
}
