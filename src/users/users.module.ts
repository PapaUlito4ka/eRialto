import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { UserProfile } from './entities/user-profile.entity';
import { User } from './entities/user.entity';
import { ImagesService } from 'src/images/images.service';
import Image from 'src/images/entities/image.entity';
import { ProductsService } from 'src/products/products.service';
import Category from 'src/categories/entities/category.entity';
import { CategoriesService } from 'src/categories/categories.service';
import Review from 'src/reviews/entities/review.entity';
import { ReviewsService } from 'src/reviews/reviews.service';
import { UserSubscriber } from './users.subscriber';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ImagesService, ProductsService, CategoriesService, ReviewsService, UserSubscriber],
  imports: [
    TypeOrmModule.forFeature([User, UserProfile, Product, Image, Category, Review])
  ]
})
export class UsersModule { }
