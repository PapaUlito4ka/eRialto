import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Image from './entities/image.entity';
import type UserProfile from 'src/users/entities/user-profile.entity';
import type Product from 'src/products/entities/product.entity';

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
    let createdImages = [];

    for (const file of files) {
      const newImage = this.imagesRepository.create();

      newImage.filename = file.filename;
      newImage.path = file.path;
      newImage.product = product;

      createdImages.push(this.imagesRepository.save(newImage));
    }

    await Promise.allSettled(createdImages);

    return createdImages;
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  async update(image: Image, file: Express.Multer.File) {
    image.filename = file.filename;
    image.path = file.path;
    await this.imagesRepository.save(image);
    return image;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }

  async findUserProfileImage(userProfile: UserProfile) {
    return this.imagesRepository.findOne({
      relations: { userProfile: true },
      where: { userProfile: { id: userProfile.id } }
    });
  }
}
