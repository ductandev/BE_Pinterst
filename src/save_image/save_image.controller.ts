import { Controller, Get, Param, HttpCode, Res, UseGuards } from '@nestjs/common';
import { SaveImageService } from './save_image.service';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@ApiTags("SaveImg")
@Controller('api/save-image')
export class SaveImageController {
  constructor(private readonly saveImageService: SaveImageService) {}

  // ==============================================
  // GET THÔNG TIN ĐÃ LƯU HÌNH NÀY CHƯA THEO ID ẢNH
  // ==============================================
  @HttpCode(200)
  @Get("get-info-save-img-by-img-id/:imgID")
  getInfoSaveImgByImgId(@Param("imgID") imgID: string, @Res() res: Response) {
    return this.saveImageService.getInfoSaveImgByImgId(imgID, res)
  }

  // ========================================
  //  GET DANH SÁCH ẢNH ĐÃ LƯU THEO USER ID
  // ========================================
  @HttpCode(200)
  @Get("get-list-img-save-by-user-id/:id")
  getListImgSaveByUserId(@Param("id") id: string, @Res() res: Response) {
    return this.saveImageService.getListImgSaveByUserId(id, res)
  }
}
