import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsNumberString, Min } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    price: number;

    @IsNotEmpty()
    address: string;
}
