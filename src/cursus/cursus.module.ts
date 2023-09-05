import { Module } from '@nestjs/common';
import { CursusService } from './cursus.service';
import { CursusController } from './cursus.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Cursus } from './entities/cursus.entity';
import { StudentsService } from '../students/students.service';
import { Student } from '../students/entities/student.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Cursus, Student])],
  controllers: [CursusController],
  providers: [CursusService, StudentsService],
})
export class CursusModule {}
