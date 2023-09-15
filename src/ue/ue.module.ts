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
import { ApiKey } from '../api-key/apiKey.entity';
import { ApiKeyService } from '../api-key/api-key.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([Ue, Cursus, Student, CursusResponsible, ApiKey]),
  ],
  providers: [
    UeService,
    CursusService,
    StudentsService,
    CursusResponsiblesService,
    ApiKeyService,
  ],
})
export class UeModule {}
