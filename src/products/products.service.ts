import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginateQuery, paginate } from 'nestjs-paginate';
import { productsPaginateConfig } from './paginate.config';
import User from 'src/users/entities/user.entity';
import { ImagesService } from 'src/images/images.service';
import type Image from 'src/images/entities/image.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private imageService: ImagesService
  ) { }

  async create(user: User, createProductDto: CreateProductDto, files: Express.Multer.File[]) {
    const newProduct = this.productsRepository.create(createProductDto);

    newProduct.user = user;

    await this.productsRepository.save(newProduct);
    await this.uploadProductImages(newProduct, files);
    return newProduct;
  }

  async findAll(query: PaginateQuery) {
    return paginate(query, this.productsRepository, productsPaginateConfig);
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOneBy({ id: id });
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

  async findUserProducts(user: User, query: PaginateQuery) {
    const queryBuilder = this.productsRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.user', 'user')
      .leftJoinAndSelect('products.category', 'category')
      .leftJoinAndSelect('products.images', 'images')
      .where('products.user = :userId', { userId: user.id })
      .orderBy('products."createdAt"', 'DESC');

    return paginate(query, queryBuilder, productsPaginateConfig);
  }

  async uploadProductImages(product: Product, files: Express.Multer.File[]) {
    return this.imageService.createProductsImages(files, product);
  }
}
