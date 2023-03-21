import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create();

    newUser.email = createUserDto.email;
    newUser.salt = await bcrypt.genSalt(12);
    newUser.passwordHash = await bcrypt.hash(createUserDto.password, newUser.salt);

    await this.usersRepository.save(newUser);
    return newUser;
  }

  async findAll() {
    return await this.usersRepository.find();
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
