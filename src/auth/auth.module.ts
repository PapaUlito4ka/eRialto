import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import { RefreshJwtStrategy } from './refresh-jwt.strategy';
import UserProfile from 'src/users/entities/user-profile.entity';
import Product from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { ImagesService } from 'src/images/images.service';
import Image from 'src/images/entities/image.entity';
import { CategoriesService } from 'src/categories/categories.service';
import Category from 'src/categories/entities/category.entity';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
    TypeOrmModule.forFeature([User, UserProfile, Product, Image, Category])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshJwtStrategy, LocalStrategy, UsersService, ProductsService, ImagesService, CategoriesService],
  exports: [AuthService]
})
export class AuthModule { }
