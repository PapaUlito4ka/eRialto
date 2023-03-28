import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../users/entities/user.entity';
import UserProfile from 'src/users/entities/user-profile.entity';
import Product from './entities/product.entity';
import Category from 'src/categories/entities/category.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([User, UserProfile, Product, Category])
  ]
})
export class ProductsModule {}
