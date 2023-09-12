import { PartialType } from '@nestjs/mapped-types';
import { CreateCursusDto } from './create-cursus.dto';

export class UpdateCursusDto extends PartialType(CreateCursusDto) {}
