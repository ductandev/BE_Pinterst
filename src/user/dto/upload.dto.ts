import { ApiProperty } from "@nestjs/swagger";

export class FileUploadDto {
    @ApiProperty()
    mo_ta: string

    @ApiProperty({ type: 'string', format: 'binary'}) 
    hinhAnh: any    // Phải đúng với key khai báo tham số 1 bên FileInterceptor
    // hinhAnh: Express.Multer.File     => để như này chỉ nhận dc img
                    // Express.Multer.File    || bản chất file này tương ứng với bên API uploadFood file food.controller.ts dòng 41   => nhận files img, nên để any để có thể nhận video, ...
                    // any[] : để như này có thể nhận nhiều file
}                   
