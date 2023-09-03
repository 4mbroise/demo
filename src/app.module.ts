import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { StudentsModule } from './students/students.module';
import { CursusResponsiblesModule } from './cursus-responsibles/cursus-responsibles.module';
import { CursusModule } from './cursus/cursus.module';

@Module({
  imports: [MikroOrmModule.forRoot(), StudentsModule, CursusResponsiblesModule, CursusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
