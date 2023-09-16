import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Put, HttpCode, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from './dto/upload.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserSignUpType } from 'src/auth/entities/auth.entity';
import { Response } from 'express';
import { UserCommentType } from './entities/user.entity';

@ApiBearerAuth()        // Hiện ổ khóa trên swagger
@UseGuards(AuthGuard("jwt"))
@ApiTags("User")        // Gom nhóm API Swagger
@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService
  ) { }

  // ========================================
  //      GET DANH SÁCH ẢNH VỀ
  // ========================================
  @HttpCode(200)
  @Get("get-all-img")
  getAllImg(@Res() res: Response) {
    return this.userService.getAllImg(res)
  }

  // ========================================
  //   GET TÌM KIẾM DANH SÁCH ẢNH THEO TÊN
  // ========================================
  @HttpCode(200)
  @Get("get-img-by-name/:nameImg")
  getImgByName(@Param("nameImg") nameImg: string, @Res() res: Response) {
    return this.userService.getImgByName(nameImg, res)
  }


  // ==============================================
  // GET THÔNG TIN ẢNH VÀ NGƯỜI TẠO ẢNH BẰNG ID ẢNH
  // ==============================================
  @HttpCode(200)
  @Get("get-info-img-&-info-user-by-img-id/:imgID")
  getInfoImgAndInfoUserById(@Param("imgID") imgID: string, @Res() res: Response) {
    return this.userService.getInfoImgAndInfoUserById(imgID, res)
  }

  // ==============================================
  //     GET THÔNG TIN BÌNH LUẬN THEO ID ẢNH
  // ==============================================
  @HttpCode(200)
  @Get("get-info-comment-by-img-id/:imgID")
  getInfoCommentByImgId(@Param("imgID") imgID: string, @Res() res: Response) {
    return this.userService.getInfoCommentByImgId(imgID, res)
  }


  // ==============================================
  // GET THÔNG TIN ĐÃ LƯU HÌNH NÀY CHƯA THEO ID ẢNH
  // ==============================================
  @HttpCode(200)
  @Get("get-info-save-img-by-img-id/:imgID")
  getInfoSaveImgByImgId(@Param("imgID") imgID: string, @Res() res: Response) {
    return this.userService.getInfoSaveImgByImgId(imgID, res)
  }


  // ===========================================================
  // POST ĐỂ LƯU THÔNG TIN BÌNH LUẬN CỦA NGƯỜI DÙNG VỚI HÌNH ẢNH.
  // ===========================================================
  @HttpCode(200)
  @Post("post-info-comment-and-img")
  postCommentImg(@Body() body: UserCommentType, @Res() res: Response) {
    return this.userService.postCommentImg(body, res)
  }


  // ========================================
  //      GET INFO ALL USER
  // ========================================
  @HttpCode(200)
  @Get("get-info-all-user")
  getInfoAllUser(@Res() res: Response) {
    return this.userService.getInfoAllUser(res)
  }

  // ========================================
  //      GET INFO BY USER_ID
  // ========================================
  @HttpCode(200)
  @Get("get-info-by-user-id/:id")
  getInfoByUserId(@Param("id") id: string, @Res() res: Response) {
    return this.userService.getInfoByUserId(id, res)
  }

  // ========================================
  //  GET DANH SÁCH ẢNH ĐÃ LƯU THEO USER ID
  // ========================================
  @HttpCode(200)
  @Get("get-list-img-save-by-user-id/:id")
  getListImgSaveByUserId(@Param("id") id: string, @Res() res: Response) {
    return this.userService.getListImgSaveByUserId(id, res)
  }

  // ========================================
  //  GET DANH SÁCH ẢNH ĐÃ TẠO THEO USER ID
  // ========================================
  @HttpCode(200)
  @Get("get-list-img-create-by-user-id/:id")
  getListImgCreateByUserId(@Param("id") id: string, @Res() res: Response) {
    return this.userService.getListImgCreateByUserId(id, res)
  }


  // ========================================
  //      XÓA ẢNH ĐÃ TẠO THEO ID ẢNH
  // ========================================
  @HttpCode(200)
  @Delete("delete-img-by-id/:id")
  deleteImgCreateByUserId(@Param("id") id: string, @Res() res: Response) {
    return this.userService.deleteImgCreateByUserId(id, res)
  }


  // ========================================
  //      POST THÊM 1 ẢNH CỦA USER
  // ========================================
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto })
  @HttpCode(201)
  @Post("upload-img/:userID/:desc")
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
    @Param("desc") desc: string,
    @Res() res: Response) {

    return this.userService.uploadImg(file, userID, desc, res)
  }


  // ========================================
  //      PUT SỬA THÔNG CÁ NHÂN CỦA USER
  // ========================================
  @HttpCode(200)
  @Put("update-info/:id")
  updateInfo(@Param("id") id: string, @Body() body: UserSignUpType, @Res() res: Response) {
    return this.userService.updateInfo(id, body, res)
  }

  // Cách lấy biến môi trường nestjs
  // @Get("/get-dotenv")
  // getEnv() {
  //   return this.configService.get("TITLE")
  // }
}
