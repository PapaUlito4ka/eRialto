import { Controller, Get, Post, Body, Patch, Param, Delete, Res, StreamableFile } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';

@Controller('media')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get(':path(*)')
  async getFile(@Res() res: Response, @Param('path') path: string) {
    const fullPath = join(process.cwd(), 'src/media', path);
    const image = await this.imagesService.findByPath(join('/media', path));
    const imageExt = image.filename.split('.')[1]
    const file = createReadStream(fullPath);
    res.set({
      'Content-Type': `image/${imageExt}`,
      'Content-Disposition': `attachment; filename="${image.filename}"`
    });
    file.pipe(res)
  }

}
