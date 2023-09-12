import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCursusResponsibleDto {
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;
}
