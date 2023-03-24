import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import UserProfile from './entities/user-profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private usersProfilesRepository: Repository<UserProfile>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create();
    const newUserProfile = this.usersProfilesRepository.create();

    newUser.email = createUserDto.email;
    newUser.salt = await bcrypt.genSalt(12);
    newUser.passwordHash = await bcrypt.hash(createUserDto.password, newUser.salt);
    await this.usersRepository.save(newUser);

    newUserProfile.firstname = createUserDto.firstname;
    newUserProfile.lastname = createUserDto.lastname;
    newUserProfile.user = newUser;
    await this.usersProfilesRepository.save(newUserProfile);

    return newUserProfile;
  }

  async getUserProfile(user: User) {
    const userProfile = await this.usersProfilesRepository.findOne(
      { relations: { user: true }, where: { user: { id: user.id } } }
    );
    if (userProfile) return userProfile;
    throw new HttpException('User profile does not exist', HttpStatus.NOT_FOUND);
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id: id });
    if (user) return user;
    throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({ 'where': { email: email } });
    if (user) return user;
    throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    await this.usersRepository.update({ id: id }, updateUserDto);
    await this.usersProfilesRepository.update({ id: user.profile.id }, updateUserDto);
    return this.getUserProfile(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }
}