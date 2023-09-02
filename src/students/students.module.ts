import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Student } from './entities/student.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Student])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
