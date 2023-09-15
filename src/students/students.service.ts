import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ApiKey } from '../api-key/apiKey.entity';
import { ApiKeyService } from '../api-key/api-key.service';

@Injectable()
export class StudentsService {
  constructor(
    private em: EntityManager,
    @InjectRepository(Student)
    private readonly studentRepository: EntityRepository<Student>,
    @Inject(forwardRef(() => ApiKeyService))
    private readonly apiKeyService: ApiKeyService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const student = new Student();

    student.firstName = createStudentDto.firstName;
    student.lastName = createStudentDto.lastName;

    let numero = 1;

    while (
      (await this.studentRepository.findOne(
        {
          userID: student.lastName + numero,
        },
        { populate: true },
      )) !== null
    ) {
      numero++;
    }

    student.userID = student.lastName + numero;

    const apiKey = new ApiKey();

    let uuid = crypto.randomUUID();
    while (await this.apiKeyService.isApiKeyAlreadyUsed(uuid)) {
      console.log('looping ?');
      uuid = crypto.randomUUID();
    }
    apiKey.apiKey = uuid;
    apiKey.isAdmin = false;
    apiKey.isResponsible = false;
    apiKey.isStudent = true;
    apiKey.student = student;
    apiKey.cursusResponsible = null;

    await this.em.persistAndFlush(student);

    return student;
  }

  async findAll() {
    return await this.studentRepository.findAll({ populate: true });
  }

  async findOne(id: string) {
    return await this.studentRepository.findOneOrFail(
      { userID: id },
      { populate: true },
    );
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.findOne(id);

    if (!!updateStudentDto.firstName) {
      student.firstName = updateStudentDto.firstName;
    }

    if (!!updateStudentDto.lastName) {
      student.lastName = updateStudentDto.lastName;
    }

    await this.em.persistAndFlush(student);
    return student;
  }

  async remove(id: string) {
    const student = await this.findOne(id);

    this.em.removeAndFlush(student);

    return;
  }
}
