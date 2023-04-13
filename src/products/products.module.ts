import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../users/entities/user.entity';
import UserProfile from 'src/users/entities/user-profile.entity';
import Product from './entities/product.entity';
import Category from 'src/categories/entities/category.entity';
import { ImagesService } from 'src/images/images.service';
import Image from 'src/images/entities/image.entity';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ImagesService, CategoriesService],
  imports: [
    TypeOrmModule.forFeature([User, UserProfile, Product, Category, Image])
  ]
})
export class ProductsModule {}
