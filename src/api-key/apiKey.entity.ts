import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Student } from '../students/entities/student.entity';
import { CursusResponsible } from '../cursus-responsibles/entities/cursus-responsible.entity';

@Entity()
export class ApiKey {
  @PrimaryKey()
  apiKey: string;

  @OneToOne(() => Student, (student) => student.apiKey, { orphanRemoval: true })
  student?: Student;

  @OneToOne(
    () => CursusResponsible,
    (cursusResponsible) => cursusResponsible.apiKey,
    {
      orphanRemoval: true,
    },
  )
  cursusResponsible?: CursusResponsible;

  @Property({ default: false })
  isAdmin: boolean = false;

  @Property({ default: false })
  isStudent: boolean = false;

  @Property({ default: false })
  isResponsible: boolean = false;
}
