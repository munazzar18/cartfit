import { Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { sendJson } from 'src/helpers/helpers';
import { CreateCategoryDto, UpdateCategoryDto } from './createCategoryDto.dto';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @Get()
    async categories() {
        try {
            const categories = await this.categoryService.all()
            return sendJson(true, 'All categories fetched successfully', categories)
        } catch (error) {
            throw new HttpException('Categories not found', HttpStatus.NOT_FOUND)
        }
    }

    @Get('/:id')
    async categoryById(@Param('id', ParseIntPipe) id: number) {
        try {
            const category = await this.categoryService.byId(id)
            return sendJson(true, 'Category found for this id', category)
        } catch (error) {
            throw new NotFoundException('No Category found for this id')
        }
    }

    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        const category = await this.categoryService.create(createCategoryDto)
        return sendJson(true, 'Category created successfully', category)
    }

    @Put('/:id')
    async updateCategory(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
        try {
            const category = await this.categoryService.change(id, updateCategoryDto)
            return sendJson(true, 'Category updated successfully', category)
        } catch (error) {
            throw new HttpException('something went wrong', HttpStatus.BAD_REQUEST)
        }
    }
}
