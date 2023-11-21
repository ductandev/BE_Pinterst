import { PartialType } from '@nestjs/swagger';
import { CreateSaveImageDto } from './create-save_image.dto';

export class UpdateSaveImageDto extends PartialType(CreateSaveImageDto) {}
