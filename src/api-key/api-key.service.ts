import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable, OnModuleInit, forwardRef } from '@nestjs/common';
import { ApiKey } from './apiKey.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { StudentsService } from '../students/students.service';
import { Student } from '../students/entities/student.entity';
import { Collection, MikroORM, UseRequestContext } from '@mikro-orm/core';
import { Exam } from '../exams/entities/exam.entity';

@Injectable()
export class ApiKeyService implements OnModuleInit {
  constructor(
    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: EntityRepository<ApiKey>,
    private readonly em: EntityManager,
    @Inject(forwardRef(() => StudentsService))
    private readonly studentsService: StudentsService,
    private readonly orm: MikroORM,
  ) {}

  @UseRequestContext()
  async onModuleInit() {
    try {
      const student = await this.studentsService.findOne('admin');
    } catch (error) {
      const stud = await this.studentsService.create({
        firstName: 'admin',
        lastName: 'admin',
      });

      let uuid = crypto.randomUUID();
      while (await this.isApiKeyAlreadyUsed(uuid)) {
        console.log('looping ?');
        uuid = crypto.randomUUID();
      }
      const apiKey = new ApiKey();
      apiKey.apiKey = uuid;
      apiKey.isAdmin = true;
      stud.apiKey = apiKey;
      stud.userID = 'admin';
      await this.em.persistAndFlush(stud);
      console.log('Admin API Key : ' + uuid);
    }
  }

  //   async create(
  //     key: string,
  //     isStudent: boolean,
  //     isCursusResponsible: boolean,
  //     isAdmin: boolean,
  //     person: Person,
  //   ) {
  //     const apiKey = new ApiKey();
  //     apiKey.apiKey = key;
  //     apiKey.isAdmin = isAdmin;
  //     apiKey.isStudent = isStudent;
  //     apiKey.isResponsible = isCursusResponsible;
  //     apiKey.person = person;
  //   }

  findOne(apiKey: string) {
    return this.apiKeyRepository.findOneOrFail(
      { apiKey: apiKey },
      { populate: true },
    );
  }

  async isApiKeyAlreadyUsed(apiKey: string) {
    return this.apiKeyRepository.findOne({ apiKey: apiKey }).then((res) => {
      if (res === null) {
        return false;
      }
      return true;
    });
  }
}
