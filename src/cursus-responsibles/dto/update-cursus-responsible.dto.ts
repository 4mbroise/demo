import { PartialType } from '@nestjs/mapped-types';
import { CreateCursusResponsibleDto } from './create-cursus-responsible.dto';

export class UpdateCursusResponsibleDto extends PartialType(CreateCursusResponsibleDto) {}
