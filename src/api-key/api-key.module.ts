import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApiKey } from './apiKey.entity';
import { ApiKeyService } from './api-key.service';
import { StudentsService } from '../students/students.service';
import { Student } from '../students/entities/student.entity';

@Module({
  imports: [MikroOrmModule.forFeature([ApiKey, Student])],
  providers: [ApiKeyService, StudentsService],
})
export class ApiKeyModule {}
