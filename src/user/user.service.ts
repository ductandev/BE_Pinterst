import { Injectable, Param } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { UserSignUpType } from 'src/auth/entities/auth.entity';
import { Response } from 'express';
import { errorCode, failCode, successCode } from 'src/Config/response';
// THƯ VIỆN MÃ HÓA PASSWORD
// yarn add bcrypt
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private configService: ConfigService) { }

  model = new PrismaClient();

  // ========================================
  //      GET INFO ALL USER
  // ========================================
  async getInfoAllUser(res: Response) {
    try {
      let data = await this.model.nguoi_dung.findMany()
      successCode(res, data, 200, "Thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: user.service.ts:195 ~ UserService ~ getInfoAllUser ~ exception:", exception)
      errorCode(res, "Lỗi BE")
    }
  }

  // ========================================
  //      GET INFO BY USER_ID
  // ========================================
  async getInfoByUserId(id: string, res: Response) {
    try {
      let data = await this.model.nguoi_dung.findFirst({
        where: {
          nguoi_dung_id: +id
        }
      });

      if (data === null) {
        return failCode(res, '', 400, "Người dùng không tồn tại !")
      }

      successCode(res, data, 200, "Thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: user.service.ts:218 ~ UserService ~ getInfoByUserId ~ exception:", exception)
      errorCode(res, "Lỗi BE")
    }
  }

  // ========================================
  //      PUT SỬA THÔNG CÁ NHÂN CỦA USER
  // ========================================
  async updateInfo(id: string, body: UserSignUpType, res: Response) {
    try {
      let { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = body;

      let checkEmail = await this.model.nguoi_dung.findFirst({
        where: {
          nguoi_dung_id: +id,
          email
        },
      });

      if (checkEmail === null) {
        return failCode(res, '', 400, "Người dùng không tồn tại !")
      }

      await this.model.nguoi_dung.update({
        where: {
          nguoi_dung_id: +id,
          email
        },
        data: {
          mat_khau: await bcrypt.hash(mat_khau, 10), //  thay đổi bcrypt.hashSync thành await bcrypt.hash để sử dụng hàm hash bất đồng bộ. Điều này cần thiết để tránh blocking thread chính khi mã hóa mật khẩu.
          ho_ten,
          tuoi,
          anh_dai_dien
        }
      })

      successCode(res, body, 200, "Cập nhật thông tin thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: user.service.ts:367 ~ UserService ~ updateInfo ~ exception:", exception)
      errorCode(res, "Lỗi BE")
    }
  }

}
