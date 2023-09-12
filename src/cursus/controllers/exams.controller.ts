import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExamsService } from '../../exams/exams.service';
import { CreateExamDto } from '../../exams/dto/create-exam.dto';
import { UpdateExamDto } from '../../exams/dto/update-exam.dto';
import { Exam } from '../../exams/entities/exam.entity';

@Controller('cursus/:cursusName/ue/:ueName/exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  create(
    @Param('cursusName') cursusName: string,
    @Param('ueName') ueName: string,
    @Body() createExamDto: CreateExamDto,
  ) {
    return this.examsService.create(cursusName, ueName, createExamDto);
  }

  @Get()
  findAll(
    @Param('cursusName') cursusName: string,
    @Param('ueName') ueName: string,
  ) {
    return this.examsService.findAll(cursusName, ueName);
  }

  @Get(':userId')
  findOne(
    @Param('cursusName') cursusName: string,
    @Param('ueName') ueName: string,
    @Param('userId') userId: string,
  ) {
    return this.examsService.findOne(cursusName, ueName, userId);
  }

  @Patch(':userId')
  update(
    @Param('cursusName') cursusName: string,
    @Param('ueName') ueName: string,
    @Param('userId') userId: string,
    @Body() updateExamDto: UpdateExamDto,
  ) {
    return this.examsService.update(cursusName, ueName, userId, updateExamDto);
  }

  @Delete(':userId')
  remove(
    @Param('cursusName') cursusName: string,
    @Param('ueName') ueName: string,
    @Param('userId') userId: string,
  ) {
    return this.examsService.remove(cursusName, ueName, userId);
  }
}
