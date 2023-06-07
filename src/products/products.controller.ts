import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors, UploadedFiles, ClassSerializerInterceptor, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { diskStorage } from 'multer';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 5, {
    storage: diskStorage({
      destination: 'src/media/product_images',
      filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
      }
    })
  }))
  create(@Request() req, @Body() createProductDto: CreateProductDto, @UploadedFiles() files: Express.Multer.File[]) {
    return this.productsService.create(req.user, createProductDto, files);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.productsService.findAll(query);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.productsService.remove(id);
  }
}
