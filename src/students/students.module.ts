import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Student } from './entities/student.entity';
import { ApiKey } from '../api-key/apiKey.entity';
import { ApiKeyService } from '../api-key/api-key.service';

@Module({
  imports: [MikroOrmModule.forFeature([Student, ApiKey])],
  controllers: [StudentsController],
  providers: [StudentsService, ApiKeyService],
})
export class StudentsModule {}
