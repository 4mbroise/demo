import { Module } from '@nestjs/common';
import { CursusResponsiblesService } from './cursus-responsibles.service';
import { CursusResponsiblesController } from './cursus-responsibles.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CursusResponsible } from './entities/cursus-responsible.entity';

@Module({
  imports: [MikroOrmModule.forFeature([CursusResponsible])],
  controllers: [CursusResponsiblesController],
  providers: [CursusResponsiblesService],
})
export class CursusResponsiblesModule {}
