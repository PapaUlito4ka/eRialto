import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateProductDto {
    @IsNumber()
    categoryId: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @Min(1)
    price: number;

    @IsNotEmpty()
    address: string;
}
