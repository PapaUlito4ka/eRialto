import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import Category from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, paginate } from 'nestjs-paginate';
import { categoriesPaginateConfig } from './paginate.config';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoriesRepository.create(createCategoryDto);

    await this.categoriesRepository.save(newCategory);
    return newCategory;
  }

  async findAll(query: PaginateQuery) {
    return paginate(query, this.categoriesRepository, categoriesPaginateConfig);
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOneBy({ id: id });
    if (category) return category;
    throw new HttpException('Category does not exist', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);
    this.categoriesRepository.update({ id: id }, updateCategoryDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    return this.categoriesRepository.remove(category);
  }
}
