import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import Image from './entities/image.entity';
import type UserProfile from 'src/users/entities/user-profile.entity';
import type Product from 'src/products/entities/product.entity';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

@Injectable()
export class ImagesService {

  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) { }

  async createProfileImage(file: Express.Multer.File, userProfile: UserProfile) {
    const newImage = this.imagesRepository.create();

    newImage.filename = file.filename;
    newImage.path = file.path;
    newImage.userProfile = userProfile;

    await this.imagesRepository.save(newImage);
    return newImage;
  }

  async createProductsImages(files: Express.Multer.File[], product: Product): Promise<Image[]> {
    let createdImages: Image[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files.at(i);
      const newImage = this.imagesRepository.create();

      newImage.filename = file.filename;
      newImage.path = file.path.slice(3);
      newImage.product = product;

      createdImages.push(newImage);
    }

    return createdImages;
  }

  async updateProductImages(files: Express.Multer.File[], product: Product): Promise<Image[]> {
    await this.removeProductImages(product);
    return this.createProductsImages(files, product);
  }

  async removeProductImages(product: Product) {
    const unlinkAsync = promisify(fs.unlink);
    
    for (let image of product.images) {
      const imageFilePath = path.join('src/media/product_images', image.filename);
      await unlinkAsync(imageFilePath);
      await this.remove(image.id);
    }
  }

  findAll() {
    return `This action returns all images`;
  }

  async findOne(id: number) {
    const image = await this.imagesRepository.findOneBy({ id: id });
    if (image) return image;
    throw new HttpException('Image does not exist', HttpStatus.NOT_FOUND);
  }

  async findByPath(path: string) {
    const image = await this.imagesRepository.findOne({
      where: { path: Like(path) }
    });
    if (image) return image;
    throw new HttpException('Image does not exist', HttpStatus.NOT_FOUND);
  }

  async update(image: Image, file: Express.Multer.File) {
    image.filename = file.filename;
    image.path = file.path;
    await this.imagesRepository.save(image);
    return image;
  }

  async remove(id: number) {
    const image = await this.findOne(id);
    await this.imagesRepository.remove(image);
  }

  async findUserProfileImage(userProfile: UserProfile) {
    return this.imagesRepository.findOne({
      relations: { userProfile: true },
      where: { userProfile: { id: userProfile.id } }
    });
  }
}
