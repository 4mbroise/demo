import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCursusDto } from './dto/create-cursus.dto';
import { UpdateCursusDto } from './dto/update-cursus.dto';
import { Cursus } from './entities/cursus.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { StudentsService } from '../students/students.service';
import { CursusResponsiblesService } from '../cursus-responsibles/cursus-responsibles.service';

@Injectable()
export class CursusService {
  constructor(
    private em: EntityManager,
    @InjectRepository(Cursus)
    private readonly cursusRepository: EntityRepository<Cursus>,
    private readonly studentsService: StudentsService,
    private readonly cursusResponsibleService: CursusResponsiblesService,
  ) {}

  async create(createCursusDto: CreateCursusDto) {
    const cursus = new Cursus();
    cursus.cursusName = createCursusDto.cursusName;

    // Populate students
    for (let i = 0; i < createCursusDto.students.length; i++) {
      const studentID = createCursusDto.students[i];

      console.log('KK');
      const student = await this.studentsService.findOne(studentID);
      console.log('OKOK');

      cursus.students.add(student);
      console.log('KOKO');
    }

    console.log('TESTEST');

    // Populate cursus responsible
    for (let i = 0; i < createCursusDto.cursusResponsibles.length; i++) {
      const cursusResponsibleID = createCursusDto.cursusResponsibles[i];

      const cursusResponsible =
        await this.cursusResponsibleService.findOne(cursusResponsibleID);
      cursus.cursusResponsibles.add(cursusResponsible);
    }

    await this.em.persistAndFlush(cursus);

    return cursus;
  }

  findAll() {
    return this.cursusRepository.findAll({ populate: true });
  }

  findOne(id: string) {
    return this.cursusRepository.findOneOrFail(
      { cursusName: id },
      { populate: true },
    );
  }

  async update(id: string, updateCursusDto: UpdateCursusDto) {
    const cursus = await this.findOne(id);

    // Update name if needed
    if (updateCursusDto.cursusName) {
      cursus.cursusName = updateCursusDto.cursusName;
    }

    // Update students if needed
    if (!!updateCursusDto.students) {
      cursus.students.removeAll();
      for (let i = 0; i < updateCursusDto.students.length; i++) {
        const studentID = updateCursusDto.students[i];

        const student = await this.studentsService.findOne(studentID);
        cursus.students.add(student);
      }
    }

    // Update cursus responsible if needed
    if (!!updateCursusDto.cursusResponsibles) {
      cursus.cursusResponsibles.removeAll();
      for (let i = 0; i < updateCursusDto.cursusResponsibles.length; i++) {
        const cursusResponsibleID = updateCursusDto.cursusResponsibles[i];

        const cursusResponsible =
          await this.cursusResponsibleService.findOne(cursusResponsibleID);
        cursus.cursusResponsibles.add(cursusResponsible);
      }
    }

    await this.em.persistAndFlush(cursus);

    return cursus;
  }

  async remove(id: string) {
    const cursus = await this.findOne(id);
    await this.em.removeAndFlush(cursus);
    return;
  }
}
