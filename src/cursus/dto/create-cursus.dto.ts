import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCursusDto {
  @IsString()
  @IsNotEmpty()
  cursusName: string;

  @IsString({ each: true })
  @IsNotEmpty()
  students: string[];

  @IsString({ each: true })
  @IsNotEmpty()
  cursusResponsibles: string[];
}
