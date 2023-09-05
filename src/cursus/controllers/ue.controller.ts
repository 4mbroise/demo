import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UeService } from '../../ue/ue.service';
import { CreateUeDto } from '../../ue/dto/create-ue.dto';
import { UpdateUeDto } from '../../ue/dto/update-ue.dto';

@Controller('cursus/:cursusName/ue')
export class UeController {
  constructor(private readonly ueService: UeService) {}

  @Post()
  create(
    @Param('cursusName') cursusName: string,
    @Body() createUeDto: CreateUeDto,
  ) {
    return this.ueService.create(cursusName, createUeDto);
  }

  @Get()
  findAll(@Param('cursusName') cursusName: string) {
    return this.ueService.findAll(cursusName);
  }

  @Get(':ueName')
  findOne(
    @Param('cursusName') cursusName: string,
    @Param('ueName') ueName: string,
  ) {
    return this.ueService.findOne(cursusName, ueName);
  }

  @Patch(':ueName')
  update(
    @Param('cursusName') cursusName: string,
    @Param('ueName') ueName: string,
    @Body() updateCursusDto: UpdateUeDto,
  ) {
    return this.ueService.update(cursusName, ueName, updateCursusDto);
  }

  @Delete(':ueName')
  remove(
    @Param('cursusName') cursusName: string,
    @Param('ueName') ueName: string,
  ) {
    return this.ueService.remove(cursusName, ueName);
  }
}
