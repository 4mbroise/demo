import { Injectable } from '@nestjs/common';
import { CreateUeDto } from './dto/create-ue.dto';
import { UpdateUeDto } from './dto/update-ue.dto';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Ue } from './entities/ue.entity';
import { CursusService } from '../cursus/cursus.service';

@Injectable()
export class UeService {
  constructor(
    private em: EntityManager,
    @InjectRepository(Ue)
    private readonly ueRepository: EntityRepository<Ue>,
    private cursusService: CursusService,
  ) {}

  async create(cursusName: string, createUeDto: CreateUeDto) {
    const ue = new Ue();

    ue.cursus = await this.cursusService.findOne(cursusName);

    ue.ueName = createUeDto.ueName;

    this.em.persistAndFlush(ue);

    return ue;
  }

  async findAll(cursusName: string) {
    const cursus = await this.cursusService.findOne(cursusName);
    return cursus.ues;
  }

  async findOne(cursusName: string, ueName: string) {
    const cursus = await this.cursusService.findOne(cursusName);

    return await this.ueRepository.findOneOrFail({
      ueName: ueName,
      cursus: cursus,
    });
  }

  async update(cursusName: string, ueName: string, updateUeDto: UpdateUeDto) {
    const ue = await this.findOne(cursusName, ueName);

    if (!!updateUeDto.ueName) {
      ue.ueName = updateUeDto.ueName;
    }

    await this.em.persistAndFlush(ue);
    return ue;
  }

  async remove(cursusName: string, ueName: string) {
    const ue = await this.findOne(cursusName, ueName);
    this.em.removeAndFlush(ue);
    return;
  }
}
