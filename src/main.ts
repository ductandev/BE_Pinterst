import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: "*" }); // CORS() cho phép FE truy cập vào BE
  app.use(express.static("."))    // '.' Đứng ở thư mục gốc 

  // 3 dòng code hiển thị swagger
  const config = new DocumentBuilder().setTitle("PINTEREST").setVersion("1.1.3").addBearerAuth().build();   // chứa 1 đối tượng config, những cấu hình liên quan đến swagger
  const document = SwaggerModule.createDocument(app, config);     // 
  SwaggerModule.setup("swagger", app, document);                  // Nơi định nghĩa endpoint truy cập vào UI swagger || tham số 1: endpoint || tham số 2: app server BE


  await app.listen(8080);
}
bootstrap();
 

// Đối tượng => 3 module => [tên đối tượng].[tên module].ts
// module: Giúp kết nối controller, service của đối tượng đó và kết nối với module của đối tượng khác lại với nhau
// controller: tạo API
// service: xử lý chức năng 


// DTO  : data transfer object
// entities,entity hiểu như là 1 (object ) => nó là type của bất kỳ 1 thằng nào đó


// LỆNH TẠO ĐỐI TƯỢNG
// user => 3 module
// nest g resource user --no-spec
// Auth => 3 module
// nest g resource auth --no-spec


// B1: yarn add prisma @prisma/client
// B2: yarn prisma init
// B3: sửa lại chuỗi kết nối và schema.prisma mục provider
// B4: yarn prisma db pull
// B5: yarn prisma generate


// Cài swaager
// yarn add @nestjs/swagger swagger-ui-express


// Cài JWT
// yarn add @nestjs/passport passport passport-local  @nestjs/jwt passport-jwt @types/passport-jwt