import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { errorCode, failCode, successCode } from 'src/Config/response';
import { UserCommentType } from './entities/comment.entity';
import { Response } from 'express';


@Injectable()
export class CommentService {
  constructor () {}

  model = new PrismaClient();


  // ==============================================
  //      GET THÔNG TIN BÌNH LUẬN THEO ID ẢNH
  // ==============================================
  async getInfoCommentByImgId(imgID: string, res: Response) {
    try {
      let data = await this.model.hinh_anh.findMany({
        where: {
          hinh_id: +imgID
        },
        include: {
          binh_luan: true
        }
      });

      if (data.length === 0) {
        return failCode(res, '', 400, "Ảnh không tồn tại !")
      }

      successCode(res, data, 200, "Thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: user.service.ts:107 ~ UserService ~ getInfoCommentByImgId ~ exception:", exception)
      errorCode(res, "Lỗi BE")
    }
  }

  // ===========================================================
  // POST ĐỂ LƯU THÔNG TIN BÌNH LUẬN CỦA NGƯỜI DÙNG VỚI HÌNH ẢNH.
  // ===========================================================
  async postCommentImg(body: UserCommentType, res: Response) {
    try {
      let { nguoi_dung_id, hinh_id, ngay_binh_luan, noi_dung } = body;

      let checkUserID = await this.model.nguoi_dung.findFirst({
        where: {
          nguoi_dung_id,
        },
      });

      let checkImgID = await this.model.hinh_anh.findFirst({
        where: {
          hinh_id,
        },
      });

      if (checkUserID === null) {
        return failCode(res, '', 400, "Người dùng không tồn tại !")
      }
      if (checkImgID === null) {
        return failCode(res, '', 400, "Hình ảnh không tồn tại !")
      }

      // let newData = {
      //   nguoi_dung_id,
      //   hinh_id,
      //   ngay_binh_luan,
      //   noi_dung,
      // };

      await this.model.binh_luan.create({
        data: body,
      });

      successCode(res, body, 201, "Thêm bình luận thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: user.service.ts:180 ~ UserService ~ postCommentImg ~ exception:", exception)
      errorCode(res, "Lỗi BE")
    }
  }
}
