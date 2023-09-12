import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { StudentsModule } from './students/students.module';
import { CursusResponsiblesModule } from './cursus-responsibles/cursus-responsibles.module';
import { CursusModule } from './cursus/cursus.module';
import { APP_FILTER } from '@nestjs/core';
import { UniqueConstraintViolationExceptionFilter } from './shared/exception-filters/unique-constraint-violation.exception-filter';
import { NotFoundErrorExceptionFilter } from './shared/exception-filters/not-found.exception-filter';
import { UeModule } from './ue/ue.module';
import { ExamsModule } from './exams/exams.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    StudentsModule,
    CursusResponsiblesModule,
    CursusModule,
    UeModule,
    ExamsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: UniqueConstraintViolationExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundErrorExceptionFilter,
    },
  ],
})
export class AppModule {}
