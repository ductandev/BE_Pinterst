import { ApiProperty } from "@nestjs/swagger"

export class UserCommentType {
    // @ApiProperty()
    binh_luan_id: number
    @ApiProperty()
    nguoi_dung_id: number
    @ApiProperty()
    hinh_id: number
    @ApiProperty()
    ngay_binh_luan: Date
    @ApiProperty()
    noi_dung: string
}


export class UserImgType {
    hinh_id: number
    ten_hinh: string
    duong_dan: string
    @ApiProperty()
    mo_ta: string
    @ApiProperty()
    nguoi_dung_id: number
}


export class UserSaveImgType {
    nguoi_dung_id: number
    hinh_id: number
    ngay_luu: Date
}