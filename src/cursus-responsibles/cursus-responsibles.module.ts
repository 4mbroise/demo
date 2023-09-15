import { Module } from '@nestjs/common';
import { CursusResponsiblesService } from './cursus-responsibles.service';
import { CursusResponsiblesController } from './cursus-responsibles.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CursusResponsible } from './entities/cursus-responsible.entity';
import { ApiKey } from '../api-key/apiKey.entity';
import { ApiKeyService } from '../api-key/api-key.service';
import { StudentsService } from '../students/students.service';
import { Student } from '../students/entities/student.entity';

@Module({
  imports: [MikroOrmModule.forFeature([CursusResponsible, ApiKey, Student])],
  controllers: [CursusResponsiblesController],
  providers: [CursusResponsiblesService, ApiKeyService, StudentsService],
})
export class CursusResponsiblesModule {}
