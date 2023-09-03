import { Module } from '@nestjs/common';
import { CursusService } from './cursus.service';
import { CursusController } from './cursus.controller';

@Module({
  controllers: [CursusController],
  providers: [CursusService],
})
export class CursusModule {}
