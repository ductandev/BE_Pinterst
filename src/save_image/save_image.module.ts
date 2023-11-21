import { Module } from '@nestjs/common';
import { SaveImageService } from './save_image.service';
import { SaveImageController } from './save_image.controller';

@Module({
  controllers: [SaveImageController],
  providers: [SaveImageService],
})
export class SaveImageModule {}
