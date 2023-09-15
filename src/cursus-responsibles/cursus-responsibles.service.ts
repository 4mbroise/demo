import { Injectable } from '@nestjs/common';
import { CreateCursusResponsibleDto } from './dto/create-cursus-responsible.dto';
import { UpdateCursusResponsibleDto } from './dto/update-cursus-responsible.dto';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CursusResponsible } from './entities/cursus-responsible.entity';
import { ApiKey } from '../api-key/apiKey.entity';
import { ApiKeyService } from '../api-key/api-key.service';

@Injectable()
export class CursusResponsiblesService {
  constructor(
    private em: EntityManager,
    @InjectRepository(CursusResponsible)
    private readonly cursusResponsibleRepository: EntityRepository<CursusResponsible>,
    private readonly apiKeyService: ApiKeyService,
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

    const apiKey = new ApiKey();

    let uuid = crypto.randomUUID();
    while (await this.apiKeyService.isApiKeyAlreadyUsed(uuid)) {
      console.log('looping ?');
      uuid = crypto.randomUUID();
    }
    apiKey.apiKey = uuid;
    apiKey.isAdmin = false;
    apiKey.isResponsible = true;
    apiKey.isStudent = false;
    apiKey.student = null;
    apiKey.cursusResponsible = cursusResponsible;

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
