import { Module } from '@nestjs/common';
import { CursusService } from './cursus.service';
import { CursusController } from './cursus.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Cursus } from './entities/cursus.entity';
import { StudentsService } from '../students/students.service';
import { Student } from '../students/entities/student.entity';
import { CursusResponsible } from '../cursus-responsibles/entities/cursus-responsible.entity';
import { CursusResponsiblesService } from '../cursus-responsibles/cursus-responsibles.service';

@Module({
  imports: [MikroOrmModule.forFeature([Cursus, Student, CursusResponsible])],
  controllers: [CursusController],
  providers: [CursusService, StudentsService, CursusResponsiblesService],
})
export class CursusModule {}
