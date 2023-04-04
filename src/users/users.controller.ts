import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseFilters, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  userProfile(@Request() req) {
    return this.usersService.getUserProfile(req.user);
  }

  @Get('my-products')
  myProducts(@Request() req) {
    return this.usersService.myProducts(req.user);
  }

  @Patch()
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user, updateUserDto);
  }

  @Delete()
  remove(@Request() req) {
    return this.usersService.remove(req.user);
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
