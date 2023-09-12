import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core';
import { Cursus } from '../../cursus/entities/cursus.entity';
import { Ue } from '../../ue/entities/ue.entity';
import { Student } from '../../students/entities/student.entity';

@Entity()
export class Exam {
  @ManyToOne({
    primary: true,
    serializer(cursus: Cursus) {
      return cursus.cursusName;
    },
  })
  cursus: Cursus;

  @ManyToOne({
    primary: true,
    serializer(ue: Ue) {
      return ue.ueName;
    },
  })
  ue: Ue;

  @ManyToOne({
    primary: true,
    serializer(student: Student) {
      return student.lastName.toUpperCase() + ' ' + student.firstName;
    },
  })
  student: Student;

  @Property()
  mark: number;

  @Property({ persist: false })
  get average() {
    if (this.ue.exams.length > 0) {
      const average =
        this.ue.exams
          .getItems()
          .map((exam) => exam.mark) // Je convertis le tableau de Exam en tableau de number
          .reduce((partialSum, a) => partialSum + a, 0) / this.ue.exams.length; // Je divise la somme des valeurs du tableau pour obtenir la moyenne

      return average;
    }
    return -1;
  }
  [PrimaryKeyType]?: [string, string, string];
}
