import { ApiProperty } from "@nestjs/swagger"

export type UserInfoDto = {
    nguoi_dung_id: number,
    email: string,
    mat_khau: string,
    ho_ten: string,
    tuoi: number,
    anh_dai_dien: string

    userType: string,
    users: string[]
}

export class UserSignInDto {
    @ApiProperty()
    email: string

    @ApiProperty()
    mat_khau: string
}