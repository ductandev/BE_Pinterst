import { Controller, Get, Param, Delete, UseGuards, HttpCode, Res, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { ImageService } from './image.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { FileUploadDto } from './dto/upload.dto';



@ApiBearerAuth()        // Hiện ổ khóa trên swagger
@UseGuards(AuthGuard("jwt"))
@ApiTags("Image")        // Gom nhóm API Swagger
@Controller('api/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  // ========================================
  //      GET DANH SÁCH ẢNH VỀ
  // ========================================
  @HttpCode(200)
  @Get("get-all-img")
  getAllImg(@Res() res: Response) {
    return this.imageService.getAllImg(res)
  }

  // ========================================
  //   GET TÌM KIẾM DANH SÁCH ẢNH THEO TÊN
  // ========================================
  @HttpCode(200)
  @Get("get-img-by-name/:nameImg")
  getImgByName(@Param("nameImg") nameImg: string, @Res() res: Response) {
    return this.imageService.getImgByName(nameImg, res)
  }

  // ========================================
  //  GET DANH SÁCH ẢNH ĐÃ TẠO THEO USER ID
  // ========================================
  @HttpCode(200)
  @Get("get-list-img-create-by-user-id/:id")
  getListImgCreateByUserId(@Param("id") id: string, @Res() res: Response) {
    return this.imageService.getListImgCreateByUserId(id, res)
  }

  // ==============================================
  // GET THÔNG TIN ẢNH VÀ NGƯỜI TẠO ẢNH BẰNG ID ẢNH
  // ==============================================
  @HttpCode(200)
  @Get("get-info-img-&-info-user-by-img-id/:imgID")
  getInfoImgAndInfoUserById(@Param("imgID") imgID: string, @Res() res: Response) {
    return this.imageService.getInfoImgAndInfoUserById(imgID, res)
  }

  // ========================================
  //      POST THÊM 1 ẢNH CỦA USER
  // ========================================
  @ApiConsumes('multipart/form-data')
  // @ApiBody({ type: FileUploadDto })
  @HttpCode(201)
  @Post("upload-img/:userID")
  @UseInterceptors(FileInterceptor("hinhAnh",     // Tham số 1: key FE gửi lên
    {                                             // Tham số 2: định nghĩa nơi lưu, và lưu tên mới cho file
      storage: diskStorage({
        destination: process.cwd() + "/public/img",
        filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname) // null: tham số báo lỗi
      })
    }
  ))    // Sử dụng một middleware, cho phép chèn phía trước khi truy cập API
  uploadImg(
    @UploadedFile() file: Express.Multer.File,
    @Param("userID") userID: string,
    @Body() body: FileUploadDto,
    @Res() res: Response) {

    return this.imageService.uploadImg(file, userID, body, res)
  }

  // ========================================
  //      XÓA ẢNH ĐÃ TẠO THEO ID ẢNH
  // ========================================
  @HttpCode(200)
  @Delete("delete-img-by-id/:id")
  deleteImgCreateByUserId(@Param("id") id: string, @Res() res: Response) {
    return this.imageService.deleteImgCreateByUserId(id, res)
  }
}
