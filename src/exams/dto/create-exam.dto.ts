import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateExamDto {
  @IsNumber()
  @Min(0)
  @Max(20)
  @IsNotEmpty()
  mark: number;

  @IsString()
  @IsNotEmpty()
  studentId: string;
}
