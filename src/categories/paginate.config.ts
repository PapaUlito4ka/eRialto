import { PaginateConfig } from "nestjs-paginate";
import Category from "./entities/category.entity";

export const categoriesPaginateConfig: PaginateConfig<Category> = {
    sortableColumns: ['id'],
    defaultLimit: 20,
    maxLimit: 200
};