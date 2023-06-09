import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import UserProfile from './entities/user-profile.entity';
import { ImagesService } from 'src/images/images.service';
import { ProductsService } from 'src/products/products.service';
import { PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private usersProfilesRepository: Repository<UserProfile>,
    private productsService: ProductsService,
    private imagesService: ImagesService,
    private dataSource: DataSource
  ) { }

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create();
    const newUserProfile = this.usersProfilesRepository.create();

    newUser.email = createUserDto.email;
    newUser.salt = await bcrypt.genSalt(12);
    newUser.passwordHash = await bcrypt.hash(createUserDto.password, newUser.salt);

    newUserProfile.firstname = createUserDto.firstname;
    newUserProfile.lastname = createUserDto.lastname;
    newUserProfile.user = newUser;

    await this.dataSource.transaction(async (transactionManager: EntityManager) => {
      await this.usersRepository.save(newUser);
      await this.usersProfilesRepository.save(newUserProfile);
    });

    return newUserProfile;
  }

  async getUserProfile(user: User) {
    const userProfile = await this.usersProfilesRepository.findOne({
      relations: { image: true, user: true },
      where: { user: { id: user.id } }
    });
    if (userProfile) return userProfile;
    throw new HttpException('User profile does not exist', HttpStatus.NOT_FOUND);
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id: id });
    if (user) return user;
    throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email: email },
      relations: { profile: true }
    });
    if (user) return user;
    throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
  }

  async update(user: User, updateUserDto: UpdateUserDto) {
    const { email, ...profileData } = updateUserDto;
    const userProfile = await this.getUserProfile(user);
    await this.usersRepository.update({ id: user.id }, { email });
    await this.usersProfilesRepository.update({ id: userProfile.id }, profileData);
    return this.getUserProfile(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }

  async userProducts(user: User, query: PaginateQuery) {
    return this.productsService.findUserProducts(user, query);
  }

  async uploadProfileImage(user: User, file: Express.Multer.File) {
    const curProfileImage = await this.imagesService.findUserProfileImage(user.profile);
    if (curProfileImage) {
      return this.imagesService.update(curProfileImage, file);
    }
    return this.imagesService.createProfileImage(file, user.profile);
  }
}
