import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { PaginateQuery, paginate } from 'nestjs-paginate';
import { productsPaginateConfig } from './paginate.config';
import User from 'src/users/entities/user.entity';
import { ImagesService } from 'src/images/images.service';
import type Image from 'src/images/entities/image.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { parseFilter } from 'nestjs-paginate/lib/filter';
import Review from 'src/reviews/entities/review.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private imageService: ImagesService,
    private categoriesService: CategoriesService,
    private dataSource: DataSource
  ) { }

  async create(user: User, createProductDto: CreateProductDto, files: Express.Multer.File[]) {
    const category = await this.categoriesService.findOneByName(createProductDto.category);
    const newProduct = this.productsRepository.create({
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      address: createProductDto.address
    });

    newProduct.category = category;
    newProduct.user = user;

    const productImages = await this.uploadProductImages(newProduct, files);
    await this.dataSource.transaction(async (transactionManager: EntityManager) => {
      await transactionManager.save(newProduct);
      await transactionManager.save(productImages);
    });

    return newProduct;
  }

  async findAll(query: PaginateQuery) {
    const queryBuilder = this.productsRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.user', 'user')
      .leftJoinAndSelect('products.category', 'category')
      .leftJoinAndSelect('products.images', 'images');
    
    let avgRatingGte = 0;
    let avgRatingLte = 5;
    if (query.filter && query.filter['user.avgRating__gte']) {
      avgRatingGte = Number.parseInt(query.filter['user.avgRating__gte'] as string);
    }
    if (query.filter && query.filter['user.avgRating__lte']) {
      avgRatingLte = Number.parseInt(query.filter['user.avgRating__lte'] as string);
    }
    const products = await paginate(query, queryBuilder, productsPaginateConfig);
    products.data = products.data.filter(product =>
      product.user.avgRating >= avgRatingGte && product.user.avgRating <= avgRatingLte
    );
    return products;
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id: id },
      relations: { images: true, user: { profile: true }, category: { parentCategory: true } }
    });
    if (product) return product;
    throw new HttpException('Product does not exist', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateProductDto: UpdateProductDto, files: Express.Multer.File[]) {
    const product = await this.findOne(id);
    const category = await this.categoriesService.findOneByName(updateProductDto.category);

    product.name = updateProductDto.name;
    product.description = updateProductDto.description;
    product.price = updateProductDto.price;
    product.address = updateProductDto.address;
    product.category = category;

    return await this.productsRepository.save(product);
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
