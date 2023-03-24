import { IsNotEmpty, Min } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @Min(1)
    price: Number;
}
