import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    UserModule, 
    ConfigModule.forRoot({isGlobal: true}), 
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
