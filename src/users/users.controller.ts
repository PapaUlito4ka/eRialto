import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseFilters, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  userProfile(@Request() req) {
    return this.usersService.getUserProfile(req.user);
  }

  @Get('products')
  userProducts(@Request() req, @Paginate() query: PaginateQuery) {
    return this.usersService.userProducts(req.user, query);
  }

  @Patch()
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user, updateUserDto);
  }

  @Post('profile-image')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: '../media/profile_images'
    })
  }))
  uploadProfileImage(@Request() req, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.uploadProfileImage(req.user, file);
  }
}
