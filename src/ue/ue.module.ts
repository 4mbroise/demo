import { Module } from '@nestjs/common';
import { UeService } from './ue.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Ue } from './entities/ue.entity';
import { CursusService } from '../cursus/cursus.service';
import { Cursus } from '../cursus/entities/cursus.entity';
import { StudentsService } from '../students/students.service';
import { CursusResponsiblesService } from '../cursus-responsibles/cursus-responsibles.service';
import { Student } from '../students/entities/student.entity';
import { CursusResponsible } from '../cursus-responsibles/entities/cursus-responsible.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([Ue, Cursus, Student, CursusResponsible]),
  ],
  providers: [
    UeService,
    CursusService,
    StudentsService,
    CursusResponsiblesService,
  ],
})
export class UeModule {}
