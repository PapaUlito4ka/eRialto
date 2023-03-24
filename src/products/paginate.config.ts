import { PaginateConfig } from "nestjs-paginate";
import Product from "./entities/product.entity";

export const productsPaginateConfig: PaginateConfig<Product> = {
    sortableColumns: ['id'],
    defaultLimit: 20,
    maxLimit: 200
};