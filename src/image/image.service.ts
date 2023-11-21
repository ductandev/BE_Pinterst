import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { errorCode, failCode, successCode } from 'src/Config/response';
import { Response } from 'express';
import * as fs from 'fs';

import { FileUploadDto } from '../image/dto/upload.dto';
import { SaveImgType } from './entities/image.entity';


@Injectable()
export class ImageService {
  constructor() { }

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

      let newData: SaveImgType = {
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















}
