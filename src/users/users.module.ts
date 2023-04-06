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

@Module({
  controllers: [UsersController],
  providers: [UsersService, ImagesService, ProductsService],
  imports: [
    TypeOrmModule.forFeature([User, UserProfile, Product, Image])
  ]
})
export class UsersModule { }
