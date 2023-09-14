import { ApiProperty } from "@nestjs/swagger"

export class UserSignUpType {
    // @ApiProperty()
    nguoi_dung_id: number
    @ApiProperty()
    email: string
    @ApiProperty()
    mat_khau: string
    @ApiProperty()
    ho_ten: string
    @ApiProperty()
    tuoi: number
    @ApiProperty()
    anh_dai_dien: string
}