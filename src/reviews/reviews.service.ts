import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PaginateQuery, paginate } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import Review from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { reviewsPaginateConfig } from './paginate.config';
import type User from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    private usersService: UsersService
  ) {}

  async create(fromUser: User, createReviewDto: CreateReviewDto) {
    const newReview = this.reviewsRepository.create();
    const toUser = await this.usersService.findOne(createReviewDto.toUserId);

    newReview.body = createReviewDto.body;
    newReview.rating = createReviewDto.rating;
    newReview.toUser = toUser
    newReview.fromUser = fromUser;
    await this.reviewsRepository.save(newReview);

    return newReview;
  }

  findAll(userId: number, query: PaginateQuery) {
    const queryBuilder = this.reviewsRepository
      .createQueryBuilder('reviews')
      .leftJoinAndSelect('reviews.fromUser', 'fromUser')
      .leftJoinAndSelect('reviews.toUser', 'toUser')
      .where('reviews.toUser = :userId', { userId: userId })
      .orderBy('reviews."createdAt"', 'DESC');
    
    return paginate(query, queryBuilder, reviewsPaginateConfig);
  }

  async findOne(id: number) {
    const review = await this.reviewsRepository.findOneBy({ id: id });
    if (review) return review;
    throw new HttpException('Product does not exist', HttpStatus.NOT_FOUND);
  }

  async remove(user: User, id: number) {
    const review = await this.findOne(id);

    if (review.fromUser !== user) {
      throw new HttpException(`You have no access to remove review ${id}`, HttpStatus.FORBIDDEN);
    }

    return this.reviewsRepository.remove(review);
  }
}
