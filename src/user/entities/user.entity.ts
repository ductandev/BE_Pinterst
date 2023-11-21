import { ApiProperty } from "@nestjs/swagger"
export class UserImgType {
    hinh_id: number
    ten_hinh: string
    duong_dan: string
    @ApiProperty()
    mo_ta: string
    @ApiProperty()
    nguoi_dung_id: number
}

