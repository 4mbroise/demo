import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CursusService } from './cursus.service';
import { CreateCursusDto } from './dto/create-cursus.dto';
import { UpdateCursusDto } from './dto/update-cursus.dto';

@Controller('cursus')
export class CursusController {
  constructor(private readonly cursusService: CursusService) {}

  @Post()
  create(@Body() createCursusDto: CreateCursusDto) {
    return this.cursusService.create(createCursusDto);
  }

  @Get()
  findAll() {
    return this.cursusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCursusDto: UpdateCursusDto) {
    return this.cursusService.update(+id, updateCursusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursusService.remove(+id);
  }
}
