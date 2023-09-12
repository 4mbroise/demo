import { Collection, Entity, OneToMany, PrimaryKey } from '@mikro-orm/core';
import { Student } from '../../students/entities/student.entity';
import { CursusResponsible } from '../../cursus-responsibles/entities/cursus-responsible.entity';
import { Ue } from '../../ue/entities/ue.entity';

@Entity()
export class Cursus {
  @PrimaryKey()
  cursusName: string;

  @OneToMany(() => Student, (student) => student.cursus, {
    serializer(value: Collection<Student>) {
      const students = value.getItems();
      return students.map(
        (student) =>
          student.lastName.toUpperCase() +
          ' ' +
          student.firstName +
          ' (' +
          student.userID +
          ')',
      );
    },
  })
  students = new Collection<Student>(this);

  @OneToMany(
    () => CursusResponsible,
    (cursusResponsible) => cursusResponsible.cursus,
    {
      serializer(value: Collection<CursusResponsible>) {
        const cursusResponsibles = value.getItems();
        return cursusResponsibles.map(
          (cursusResponsible) =>
            cursusResponsible.lastName.toUpperCase() +
            ' ' +
            cursusResponsible.firstName +
            ' (' +
            cursusResponsible.userID +
            ')',
        );
      },
    },
  )
  cursusResponsibles = new Collection<CursusResponsible>(this);

  @OneToMany(() => Ue, (ue) => ue.cursus, {
    serializer(value: Collection<Ue>) {
      const ues = value.getItems();
      return ues.map((ue) => ue.ueName);
    },
  })
  ues = new Collection<Ue>(this);
}
