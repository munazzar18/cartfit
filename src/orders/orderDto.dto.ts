import { IsNotEmpty } from "class-validator";


export class CreateOrderDto {

    @IsNotEmpty()
    productId: number;

    @IsNotEmpty()
    userId: number;

}