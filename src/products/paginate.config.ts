import { PaginateConfig } from "nestjs-paginate";
import Product from "./entities/product.entity";

export const productsPaginateConfig: PaginateConfig<Product> = {
    sortableColumns: ['id'],
    searchableColumns: ['name', 'description'],
    defaultLimit: 20,
    maxLimit: 200
};