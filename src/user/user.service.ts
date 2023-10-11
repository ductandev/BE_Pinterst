import { Injectable, Param } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { UserSignUpType } from 'src/auth/entities/auth.entity';
import { Response } from 'express';
import { errorCode, failCode, successCode } from 'src/Config/response';
// THƯ VIỆN MÃ HÓA PASSWORD
// yarn add bcrypt
import * as bcrypt from 'bcrypt';
import { UserCommentType, UserImgType, UserSaveImgType } from './entities/user.entity';
import * as fs from 'fs';
import { FileUploadDto } from './dto/upload.dto';

@Injectable()
export class UserService {
  constructor(private configService: ConfigService) { }

  model = new PrismaClient();


  // ========================================
  //      GET DANH SÁCH ẢNH VỀ
  // ========================================
  async getAllImg(res: Response) {
    try {
      let data = await this.model.hinh_anh.findMany()

      if (data === null) {
        return failCode(res, '', 400, "Chưa có ảnh nào được thêm vào dữ liệu ảnh !")
      }

      successCode(res, data, 200, "Thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: user.service.ts:28 ~ UserService ~ getAllImg ~ exception:", exception)
      errorCode(res, "Lỗi BE")
    }
  }

  // ========================================
  //  GET TÌM KIẾM DANH SÁCH ẢNH THEO TÊN
  // ========================================
  async getImgByName(nameImg: string, res: Response) {
    try {
      let data = await this.model.hinh_anh.findMany({
        where: {
          ten_hinh: {
            contains: nameImg   // LIKE '%nameImg%'
          }
        }
      })

      successCode(res, data, 200, "Thành công !")
    }
    catch (exception) {
      errorCode(res, "Lỗi BE")
    }
  }


  // ==============================================
  // GET THÔNG TIN ẢNH VÀ NGƯỜI TẠO ẢNH BẰNG ID ẢNH
  // ==============================================
  async getInfoImgAndInfoUserById(imgID: string, res: Response) {
    try {
      let data = await this.model.hinh_anh.findMany({
        where: {
          hinh_id: +imgID
        },
        include: {
          nguoi_dung: true
        }
      });

      if (data.length === 0) {
        return failCode(res, '', 400, "Ảnh không tồn tại !")
      }

      successCode(res, data, 200, "Thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: user.service.ts:75 ~ UserService ~ getInfoImgAndInfoUserById ~ exception:", exception)
      errorCode(res, "Lỗi BE")
    }
  }


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

  // ========================================
  //  GET DANH SÁCH ẢNH ĐÃ TẠO THEO USER ID
  // ========================================
  async getListImgCreateByUserId(id: string, res: Response) {
    try {
      let data = await this.model.nguoi_dung.findMany({
        where: {
          nguoi_dung_id: +id
        },
        include: {
          hinh_anh: true
        }
      });

      if (data.length === 0) {
        return failCode(res, '', 400, "Người dùng không tồn tại !")
      }

      successCode(res, data, 200, "Thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: user.service.ts:271 ~ UserService ~ getListImgCreateByUserId ~ exception:", exception)
      errorCode(res, "Lỗi BE")
    }
  }


  // ========================================
  //      XÓA ẢNH ĐÃ TẠO THEO ID ẢNH
  // ========================================
  async deleteImgCreateByUserId(id: string, res: Response) {
    try {
      let data = await this.model.hinh_anh.findFirst({
        where: {
          hinh_id: +id
        }
      });

      if (data === null) {
        return failCode(res, '', 400, "Hình ảnh không tồn tại nên không thể xóa !")
      }

      // Trước tiên, hãy kiểm tra các tham chiếu đến bản ghi này và xóa chúng
      await this.model.luu_anh.deleteMany({
        where: {
          hinh_id: +id
        }
      });

      await this.model.binh_luan.deleteMany({
        where: {
          hinh_id: +id
        }
      });

      // Sau đó, bạn có thể xóa bản ghi hinh_anh bình thường
      await this.model.hinh_anh.delete({
        where: {
          hinh_id: +id
        }
      });

      successCode(res, data, 200, "Xóa ảnh thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: user.service.ts:315 ~ UserService ~ deleteImgCreateByUserId ~ exception:", exception)
      errorCode(res, "Lỗi BE")
    }
  }


  // ========================================
  //      POST THÊM 1 ẢNH CỦA USER
  // ========================================
  async uploadImg(file: Express.Multer.File, userID: string, body: FileUploadDto, res: Response) {
    try {
      let {mo_ta} = body

      let checkUserID = await this.model.nguoi_dung.findFirst({
        where: {
          nguoi_dung_id: +userID
        },
      });

      if (checkUserID === null) {
        fs.unlink(process.cwd() + "/public/img/" + file.filename, (err) => {    // xóa file ảnh theo đường dẫn nếu người dùng ko tồn tại
          if (err) {
            console.error("Error deleting file:", err);
          }
        });

        return failCode(res, '', 400, "Người dùng không tồn tại !")
      }

      const createdImage = await this.model.hinh_anh.create({
        data: {
          ten_hinh: file.filename,
          duong_dan: process.cwd() + "/public/img/" + file.filename,
          mo_ta,
          nguoi_dung_id: +userID
        }
      });

      let newData: UserSaveImgType = {
        nguoi_dung_id: +userID,
        hinh_id: createdImage.hinh_id, // Lấy hinh_id từ bản ghi vừa tạo
        ngay_luu: new Date()
      }
      await this.model.luu_anh.create({
        data: newData
      })

      successCode(res, file, 201, 'Thêm ảnh thành công !');
    }
    catch (exception) {
      console.log('🚀 ~ file: user.service.ts:363 ~ UserService ~ uploadImg ~ exception:', exception,);
      errorCode(res, 'Lỗi BE !');
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
