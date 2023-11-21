import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { errorCode, failCode, successCode } from 'src/Config/response';
import { Response } from 'express';


@Injectable()
export class SaveImageService {
  constructor () { }

  model = new PrismaClient();

  // ==============================================
  // GET THÔNG TIN ĐÃ LƯU HÌNH NÀY CHƯA THEO ID ẢNH
  // ==============================================
  async getInfoSaveImgByImgId(imgID: string, res: Response) {
    try {
      let data = await this.model.hinh_anh.findMany({
        where: {
          hinh_id: +imgID
        },
        include: {
          luu_anh: true
        }
      });

      if (data.length === 0) {
        return failCode(res, '', 400, "Ảnh chưa được lưu !")
      }

      successCode(res, data, 200, "Ảnh đã được lưu trước đó !")
    }
    catch (exception) {
      console.log("🚀 ~ file: user.service.ts:129 ~ UserService ~ getInfoSaveImgByImgId ~ exception:", exception)
      errorCode(res, "Lỗi BE")
    }
  }

  // ========================================
  //  GET DANH SÁCH ẢNH ĐÃ LƯU THEO USER ID
  // ========================================
  async getListImgSaveByUserId(id: string, res: Response) {
    try {
      let data = await this.model.nguoi_dung.findMany({
        where: {
          nguoi_dung_id: +id
        },
        include: {
          luu_anh: true
        }
      });

      if (data.length === 0) {
        return failCode(res, '', 400, "Người dùng không tồn tại !")
      }

      successCode(res, data, 200, "Thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: user.service.ts:245 ~ UserService ~ getListImgSaveByUserId ~ exception:", exception)
      errorCode(res, "Lỗi BE")
    }
  }

}
