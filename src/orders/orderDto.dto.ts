import { IsNotEmpty } from "class-validator";


export class CreateOrderDto {

    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    productId: number;

    @IsNotEmpty()
    userId: number;

}