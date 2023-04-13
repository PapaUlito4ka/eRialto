import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import User from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Product from 'src/products/entities/product.entity';
import UserProfile from 'src/users/entities/user-profile.entity';
import Review from './entities/review.entity';
import { UsersService } from 'src/users/users.service';
import Image from 'src/images/entities/image.entity';
import { ProductsService } from 'src/products/products.service';
import { ImagesService } from 'src/images/images.service';
import { CategoriesService } from 'src/categories/categories.service';
import Category from 'src/categories/entities/category.entity';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, UsersService, ProductsService, ImagesService, CategoriesService],
  imports: [
    TypeOrmModule.forFeature([User, UserProfile, Product, Image, Review, Category])
  ]
})
export class ReviewsModule {}
