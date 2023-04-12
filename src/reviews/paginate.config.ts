import { PaginateConfig } from "nestjs-paginate";
import Review from "./entities/review.entity";

export const reviewsPaginateConfig: PaginateConfig<Review> = {
    sortableColumns: ['id'],
    defaultLimit: 20,
    maxLimit: 200
};