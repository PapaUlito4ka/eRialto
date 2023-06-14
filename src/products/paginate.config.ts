import { FilterOperator, PaginateConfig } from "nestjs-paginate";
import Product from "./entities/product.entity";

export const productsPaginateConfig: PaginateConfig<Product> = {
    sortableColumns: ['id'],
    searchableColumns: ['name', 'description'],
    filterableColumns: {
        price: [FilterOperator.GTE, FilterOperator.LTE],
        'user.profile.avgRating': [FilterOperator.GTE, FilterOperator.LTE]
    },
    defaultLimit: 20,
    maxLimit: 200
};