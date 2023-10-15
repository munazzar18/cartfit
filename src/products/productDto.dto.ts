import { IsNotEmpty, MinLength } from "class-validator";


export class CreateProductDto {

    @IsNotEmpty()
    @MinLength(5)
    title: string;

    @IsNotEmpty()
    @MinLength(10)
    description: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    images: string[];

    @IsNotEmpty()
    specification: string

    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    categoryId: number;

}

export class UpdateProductDto {

    @IsNotEmpty()
    @MinLength(5)
    title: string;

    @IsNotEmpty()
    @MinLength(10)
    description: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    images: string[];

    @IsNotEmpty()
    specification: string

    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    categoryId: number;
}

export class UploadDto {
    filePath: string;
}