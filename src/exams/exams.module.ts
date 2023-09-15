import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Exam } from './entities/exam.entity';
import { CursusService } from '../cursus/cursus.service';
import { Cursus } from '../cursus/entities/cursus.entity';
import { Ue } from '../ue/entities/ue.entity';
import { UeService } from '../ue/ue.service';
import { StudentsService } from '../students/students.service';
import { Student } from '../students/entities/student.entity';
import { CursusResponsible } from '../cursus-responsibles/entities/cursus-responsible.entity';
import { CursusResponsiblesService } from '../cursus-responsibles/cursus-responsibles.service';
import { ApiKey } from '../api-key/apiKey.entity';
import { ApiKeyService } from '../api-key/api-key.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Exam,
      Cursus,
      Ue,
      Student,
      CursusResponsible,
      ApiKey,
    ]),
  ],
  providers: [
    ExamsService,
    CursusService,
    UeService,
    StudentsService,
    CursusResponsiblesService,
    ApiKeyService,
  ],
})
export class ExamsModule {}
