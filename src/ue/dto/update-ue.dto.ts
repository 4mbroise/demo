import { PartialType } from '@nestjs/mapped-types';
import { CreateUeDto } from './create-ue.dto';

export class UpdateUeDto extends PartialType(CreateUeDto) {}
