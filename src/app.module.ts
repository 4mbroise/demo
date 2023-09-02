import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [MikroOrmModule.forRoot(), StudentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
