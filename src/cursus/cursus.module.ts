import { Module } from '@nestjs/common';
import { CursusService } from './cursus.service';
import { CursusController } from './controllers/cursus.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Cursus } from './entities/cursus.entity';
import { StudentsService } from '../students/students.service';
import { Student } from '../students/entities/student.entity';
import { CursusResponsible } from '../cursus-responsibles/entities/cursus-responsible.entity';
import { CursusResponsiblesService } from '../cursus-responsibles/cursus-responsibles.service';
import { UeController } from './controllers/ue.controller';
import { UeService } from '../ue/ue.service';
import { Ue } from '../ue/entities/ue.entity';
import { ExamsController } from './controllers/exams.controller';
import { ExamsService } from '../exams/exams.service';
import { Exam } from '../exams/entities/exam.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([Cursus, Student, CursusResponsible, Ue, Exam]),
  ],
  controllers: [CursusController, UeController, ExamsController],
  providers: [
    CursusService,
    StudentsService,
    CursusResponsiblesService,
    UeService,
    ExamsService,
  ],
})
export class CursusModule {}
