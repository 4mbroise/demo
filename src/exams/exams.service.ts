import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Exam } from './entities/exam.entity';
import { CursusService } from '../cursus/cursus.service';
import { UeService } from '../ue/ue.service';
import { StudentsService } from '../students/students.service';
import { Student } from '../students/entities/student.entity';

@Injectable()
export class ExamsService {
  constructor(
    private em: EntityManager,
    @InjectRepository(Exam)
    private readonly examRepository: EntityRepository<Exam>,
    private cursusService: CursusService,
    private ueService: UeService,
    private studentService: StudentsService,
  ) {}

  async create(
    cursusName: string,
    ueName: string,
    createExamDto: CreateExamDto,
  ) {
    const exam = new Exam();

    const cursus = await this.cursusService.findOne(cursusName);
    exam.cursus = cursus;

    const ue = await this.ueService.findOne(cursusName, ueName);
    exam.ue = ue;

    const student = await this.studentService.findOne(createExamDto.studentId);
    exam.student = student;

    if (!cursus.students.contains(student)) {
      throw new NotFoundException(
        "Student '" +
          student.userID +
          "' does not belong to the cursus '" +
          cursus.cursusName +
          "'",
      );
    }

    exam.mark = createExamDto.mark;

    await this.em.persistAndFlush(exam);

    return exam;
  }

  async findAll(cursusName: string, ueName: string) {
    return await this.examRepository.find(
      {
        cursus: { cursusName: cursusName },
        ue: { ueName: ueName },
      },
      { populate: true },
    );
  }

  findOne(cursusName: string, ueName: string, studentId: string) {
    return this.examRepository.findOneOrFail(
      {
        cursus: { cursusName: cursusName },
        ue: { ueName: ueName },
        student: { userID: studentId },
      },
      { populate: true },
    );
  }

  async update(
    cursusName: string,
    ueName: string,
    studentId: string,
    updateExamDto: UpdateExamDto,
  ) {
    const exam = await this.findOne(cursusName, ueName, studentId);

    if (!!updateExamDto.mark) {
      exam.mark = updateExamDto.mark;
    }
    await this.em.persistAndFlush(exam);

    return exam;
  }

  async remove(cursusName: string, ueName: string, studentId: string) {
    const exam = await this.findOne(cursusName, ueName, studentId);
    await this.em.removeAndFlush(exam);
    return;
  }
}
