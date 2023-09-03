import { Injectable } from '@nestjs/common';
import { CreateCursusDto } from './dto/create-cursus.dto';
import { UpdateCursusDto } from './dto/update-cursus.dto';

@Injectable()
export class CursusService {
  create(createCursusDto: CreateCursusDto) {
    return 'This action adds a new cursus';
  }

  findAll() {
    return `This action returns all cursus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cursus`;
  }

  update(id: number, updateCursusDto: UpdateCursusDto) {
    return `This action updates a #${id} cursus`;
  }

  remove(id: number) {
    return `This action removes a #${id} cursus`;
  }
}
