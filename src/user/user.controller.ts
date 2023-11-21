import { Controller, Get, Post, Body, Param, UseGuards, Put, HttpCode, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { UserSignUpType } from 'src/auth/entities/auth.entity';

@ApiBearerAuth()        // Hiện ổ khóa trên swagger
@UseGuards(AuthGuard("jwt"))
@ApiTags("User")
@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService
  ) { }

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
  //      PUT SỬA THÔNG CÁ NHÂN CỦA USER
  // ========================================
  @HttpCode(200)
  @Put("update-info-user/:id")
  updateInfo(@Param("id") id: string, @Body() body: UserSignUpType, @Res() res: Response) {
    return this.userService.updateInfo(id, body, res)
  }

  // TESTTT
  // Cách lấy biến môi trường nestjs
  // @Get("/get-dotenv")
  // getEnv() {
  //   return this.configService.get("TITLE")
  // }
}
