import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Res, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UserCommentType } from './entities/comment.entity';
import { Response } from 'express';


@ApiBearerAuth()        
@UseGuards(AuthGuard("jwt"))
@ApiTags("Comment")  
@Controller('api/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // ==============================================
  //     GET THÔNG TIN BÌNH LUẬN THEO ID ẢNH
  // ==============================================
  @HttpCode(200)
  @Get("get-info-comment-by-img-id/:imgID")
  getInfoCommentByImgId(@Param("imgID") imgID: string, @Res() res: Response) {
    return this.commentService.getInfoCommentByImgId(imgID, res)
  }

  // ===========================================================
  // POST ĐỂ LƯU THÔNG TIN BÌNH LUẬN CỦA NGƯỜI DÙNG VỚI HÌNH ẢNH.
  // ===========================================================
  @HttpCode(200)
  @Post("post-info-comment-and-img")
  postCommentImg(@Body() body: UserCommentType, @Res() res: Response) {
    return this.commentService.postCommentImg(body, res)
  }





}
