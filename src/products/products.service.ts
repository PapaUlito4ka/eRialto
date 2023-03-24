import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginateQuery, paginate } from 'nestjs-paginate';
import { productsPaginateConfig } from './paginate.config';
import User from 'src/users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>
  ) { }

  async create(user: User, createProductDto: CreateProductDto) {
    const newProduct = this.productsRepository.create(createProductDto);

    newProduct.user = user;

    await this.productsRepository.save(newProduct);
    return newProduct;
  }

  async findAll(query: PaginateQuery) {
    return paginate(query, this.productsRepository, productsPaginateConfig);
  }

  async findOne(id: number) {
    const product = this.productsRepository.findOneBy({ id: id });
    if (product) return product;
    throw new HttpException('Product does not exist', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    await this.productsRepository.update({ id: id }, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.productsRepository.remove(product);
  }
}
