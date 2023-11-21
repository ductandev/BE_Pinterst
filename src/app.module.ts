import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ImageModule } from './image/image.module';
import { CommentModule } from './comment/comment.module';
import { SaveImageModule } from './save_image/save_image.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), 
    AuthModule, 
    UserModule,
    ImageModule,
    CommentModule,
    SaveImageModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
