import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { StudentsModule } from './students/students.module';
import { CursusResponsiblesModule } from './cursus-responsibles/cursus-responsibles.module';
import { CursusModule } from './cursus/cursus.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { UniqueConstraintViolationExceptionFilter } from './shared/exception-filters/unique-constraint-violation.exception-filter';
import { NotFoundErrorExceptionFilter } from './shared/exception-filters/not-found.exception-filter';
import { UeModule } from './ue/ue.module';
import { ExamsModule } from './exams/exams.module';
import { ApiKeyModule } from './api-key/api-key.module';
import { ApiKey } from './api-key/apiKey.entity';
import { Student } from './students/entities/student.entity';
import { ApiKeyService } from './api-key/api-key.service';
import { StudentsService } from './students/students.service';
import { AuthGuard } from './shared/auth.guard';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature([ApiKey, Student]),
    CursusResponsiblesModule,
    CursusModule,
    UeModule,
    ExamsModule,
    StudentsModule,
    ApiKeyModule,
  ],
  controllers: [AppController],
  providers: [
    StudentsService,
    ApiKeyService,
    AppService,
    {
      provide: APP_FILTER,
      useClass: UniqueConstraintViolationExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundErrorExceptionFilter,
    },
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
