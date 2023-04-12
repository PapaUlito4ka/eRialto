import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('reviews')
@UseGuards(JwtAuthGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Request() req, @Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(req.user, createReviewDto);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: string, @Paginate() query: PaginateQuery) {

    return this.reviewsService.findAll(+userId, query);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.reviewsService.remove(req.user, +id);
  }
}
