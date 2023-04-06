import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Image from './entities/image.entity';
import UserProfile from 'src/users/entities/user-profile.entity';
import User from 'src/users/entities/user.entity';
import Product from 'src/products/entities/product.entity';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports: [
    TypeOrmModule.forFeature([User, UserProfile, Image, Product])
  ]
})
export class ImagesModule {}
