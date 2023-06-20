import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from 'path';

export const fileInterceptor = FilesInterceptor('images', 5, {
    storage: diskStorage({
        destination: 'src/media/product_images',
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    })
});