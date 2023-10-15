import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Request, UnauthorizedException, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { sendJson } from 'src/helpers/helpers';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProductDto, UpdateProductDto, UploadDto } from './productDto.dto';
import { User } from 'src/user/user.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ) { }

    @Get()
    async getAllProducts(@Query('page', ParseIntPipe) page: number,) {
        try {
            const products = await this.productsService.allProducts(page)
            return sendJson(true, 'Product fetched successfully', products)
        } catch (error) {
            throw new NotFoundException('No product found')
        }
    }
    @Get('category')
    async filterByCategory(@Query('categoryIds', ParseIntPipe) categoryIds: number[]) {
        try {
            const products = await this.productsService.filterByCategory(categoryIds)
            return sendJson(true, 'Products filtered for selected category', products)
        } catch (error) {
            throw new NotFoundException('No products found for this category')
        }
    }
    @Get('search')
    async searchFilter(@Query('search') search: string) {
        try {
            const products = this.productsService.searchFilter(search)
            return sendJson(true, 'Product found successfully', products)
        } catch (error) {
            throw new NotFoundException(`No products found for this ${search}`)
        }
    }
    @Get('/:id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        try {
            const product = await this.productsService.productById(id)
            return sendJson(true, `Product found for id: ${id}`, product)
        } catch (error) {
            throw new NotFoundException(`No product found for id: ${id}`)
        }
    }
    @Post()
    @UseGuards(AuthGuard)
    async createProduct(@Body() createProductDto: CreateProductDto, @Request() req) {
        const userId: User = req.user
        const data = await this.productsService.create(createProductDto, userId)
        return sendJson(true, 'Product created successfully', data)
    }

    @Put('/:id')
    @UseGuards(AuthGuard)
    async updateProduct(@Param('id', ParseIntPipe) id: number, updateProductDto: UpdateProductDto, @Request() req) {
        try {
            const userId: User = req.user
            const product = await this.productsService.change(id, updateProductDto, userId)
            return sendJson(true, 'Product updated successfully', product)
        } catch (error) {
            throw new UnauthorizedException('You are not authorized to perform this action!')
        }
    }
    @Post('upload')
    @UseInterceptors(FilesInterceptor('files', 10, {
        storage: diskStorage({
            destination: './uploads/images',
            filename: (req, file, callback) => {
                const orginalName = file.originalname;
                const extention = extname(orginalName)
                const fileName = Date.now() + extention;
                callback(null, fileName)
            }
        })
    }))
    uploadImage(@Body() body: UploadDto, @UploadedFiles() files: Express.Multer.File[]) {
        const fileUrls = files.map((file) => 'uploads/images' + file.filename)
        return sendJson(true, 'Images uploaded successfully', fileUrls)
    }
}
