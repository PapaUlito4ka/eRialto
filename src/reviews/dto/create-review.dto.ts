import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
    @IsString()
    @IsNotEmpty()
    body: string;

    @Min(0)
    @Max(5)
    @IsNumber()
    rating: number;

    @IsNumber()
    toUserId: number;
}
