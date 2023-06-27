import { FilterOperator, PaginateConfig } from "nestjs-paginate";
import Product from "./entities/product.entity";

export const productsPaginateConfig: PaginateConfig<Product> = {
    sortableColumns: ['id', 'price', 'createdAt'],
    searchableColumns: ['name', 'description'],
    nullSort: 'last',
    relations: ['user', 'category'],
    filterableColumns: {
        price: [FilterOperator.GTE, FilterOperator.LTE],
        isArchived: [FilterOperator.EQ],
        'category.name': [FilterOperator.EQ]
    },
    defaultSortBy: [['createdAt', 'DESC']],
    defaultLimit: 20,
    maxLimit: 200
};