import { FilterOperator, PaginateConfig } from "nestjs-paginate";
import Product from "./entities/product.entity";

export const productsPaginateConfig: PaginateConfig<Product> = {
    sortableColumns: ['id', 'price', 'createdAt'],
    searchableColumns: ['name', 'description'],
    nullSort: 'last',
    relations: ['user'],
    filterableColumns: {
        price: [FilterOperator.GTE, FilterOperator.LTE],
    },
    defaultSortBy: [['createdAt', 'DESC']],
    defaultLimit: 20,
    maxLimit: 200
};