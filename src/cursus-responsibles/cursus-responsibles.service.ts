import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCursusResponsibleDto } from './dto/create-cursus-responsible.dto';
import { UpdateCursusResponsibleDto } from './dto/update-cursus-responsible.dto';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CursusResponsible } from './entities/cursus-responsible.entity';

@Injectable()
export class CursusResponsiblesService {
  constructor(
    private em: EntityManager,
    @InjectRepository(CursusResponsible)
    private readonly cursusResponsibleRepository: EntityRepository<CursusResponsible>,
  ) {}

  async create(createCursusResponsibleDto: CreateCursusResponsibleDto) {
    const cursusResponsible = new CursusResponsible();

    cursusResponsible.firstName = createCursusResponsibleDto.firstName;
    cursusResponsible.lastName = createCursusResponsibleDto.lastName;

    let numero = 1;

    while (
      (await this.cursusResponsibleRepository.findOne(
        {
          userID: cursusResponsible.lastName + numero,
        },
        { populate: true },
      )) !== null
    ) {
      numero++;
    }

    cursusResponsible.userID = cursusResponsible.lastName + numero;

    await this.em.persistAndFlush(cursusResponsible);

    return cursusResponsible;
  }

  async findAll() {
    return this.cursusResponsibleRepository.findAll({ populate: true });
  }

  async findOne(id: string) {
    return await this.cursusResponsibleRepository.findOneOrFail(
      {
        userID: id,
      },
      { populate: true },
    );
  }

  async update(
    id: string,
    updateCursusResponsibleDto: UpdateCursusResponsibleDto,
  ) {
    const cursusResponsible = await this.findOne(id);

    if (!!updateCursusResponsibleDto.firstName) {
      cursusResponsible.firstName = updateCursusResponsibleDto.firstName;
    }

    if (!!updateCursusResponsibleDto.lastName) {
      cursusResponsible.lastName = updateCursusResponsibleDto.lastName;
    }

    await this.em.persistAndFlush(cursusResponsible);
    return cursusResponsible;
  }

  async remove(id: string) {
    const cursusResponsible = await this.findOne(id);

    this.em.removeAndFlush(cursusResponsible);

    return;
  }
}
