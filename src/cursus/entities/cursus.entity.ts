import { Collection, Entity, OneToMany, PrimaryKey } from '@mikro-orm/core';
import { Student } from '../../students/entities/student.entity';
import { CursusResponsible } from '../../cursus-responsibles/entities/cursus-responsible.entity';

@Entity()
export class Cursus {
  @PrimaryKey()
  cursusName: string;

  @OneToMany(() => Student, (student) => student.cursus)
  students = new Collection<Student>(this);

  @OneToMany(
    () => CursusResponsible,
    (cursusResponsible) => cursusResponsible.cursus,
  )
  cursusResponsibles = new Collection<CursusResponsible>(this);
}
