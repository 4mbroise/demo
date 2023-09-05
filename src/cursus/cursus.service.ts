import { Injectable } from '@nestjs/common';
import { CreateCursusDto } from './dto/create-cursus.dto';
import { UpdateCursusDto } from './dto/update-cursus.dto';
import { Cursus } from './entities/cursus.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { StudentsService } from '../students/students.service';

@Injectable()
export class CursusService {
  constructor(
    private em: EntityManager,
    @InjectRepository(Cursus)
    private readonly cursusRepository: EntityRepository<Cursus>,
    private readonly studentsService: StudentsService,
  ) {}

  create(createCursusDto: CreateCursusDto) {
    const cursus = new Cursus();
    cursus.cursusName = createCursusDto.cursusName;

    // Populate students
    createCursusDto.students.forEach(async (studentID) => {
      cursus.students.add(await this.studentsService.findOne(studentID));
    });
  }

  findAll() {
    return `This action returns all cursus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cursus`;
  }

  update(id: number, updateCursusDto: UpdateCursusDto) {
    return `This action updates a #${id} cursus`;
  }

  remove(id: number) {
    return `This action removes a #${id} cursus`;
  }
}
