import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUeDto {
  @IsString()
  @IsNotEmpty()
  ueName: string;
}
