import { PartialType } from '@nestjs/swagger';
import { CreateHomepageDto } from './create-homepage.dto';

export class UpdateHomepageDto extends PartialType(CreateHomepageDto) {}
