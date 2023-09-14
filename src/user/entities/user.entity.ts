import { ApiProperty } from "@nestjs/swagger"

export class UserComment {
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
