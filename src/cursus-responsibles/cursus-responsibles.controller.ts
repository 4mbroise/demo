import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CursusResponsiblesService } from './cursus-responsibles.service';
import { CreateCursusResponsibleDto } from './dto/create-cursus-responsible.dto';
import { UpdateCursusResponsibleDto } from './dto/update-cursus-responsible.dto';

@Controller('cursus-responsibles')
export class CursusResponsiblesController {
  constructor(
    private readonly cursusResponsiblesService: CursusResponsiblesService,
  ) {}

  @Post()
  create(@Body() createCursusResponsibleDto: CreateCursusResponsibleDto) {
    return this.cursusResponsiblesService.create(createCursusResponsibleDto);
  }

  @Get()
  findAll() {
    return this.cursusResponsiblesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursusResponsiblesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCursusResponsibleDto: UpdateCursusResponsibleDto,
  ) {
    return this.cursusResponsiblesService.update(
      id,
      updateCursusResponsibleDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursusResponsiblesService.remove(id);
  }
}
