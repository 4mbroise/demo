import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { Person } from '../../shared/entities/person.entity';
import { Cursus } from '../../cursus/entities/cursus.entity';
import { Exam } from '../../exams/entities/exam.entity';
import { ApiKey } from '../../api-key/apiKey.entity';

@Entity()
export class Student extends Person {
  @ManyToOne({
    serializer: (cursus: Cursus) => {
      if (!!cursus) {
        return cursus.cursusName;
      }
      return null;
    },
  })
  cursus?: Cursus;

  @OneToMany(() => Exam, (exam) => exam.student, {
    serializer(value: Collection<Exam>) {
      return value.getItems().map((exam) => {
        return { average: exam.average, mark: exam.mark, ue: exam.ue.ueName };
      });
    },
  })
  exams = new Collection<Exam>(this);

  @Property({ persist: false })
  get globalAverage() {
    if (this.exams.length !== 0) {
      return (
        this.exams
          .getItems()
          .map((exam) => exam.mark)
          .reduce((partialSum, a) => partialSum + a, 0) / this.exams.length
      );
    }
    return -1;
  }

  @OneToOne(() => ApiKey, (apiKey) => apiKey.student, {
    owner: true,
    serializer(value: ApiKey) {
      return value.apiKey;
    },
  })
  apiKey: ApiKey;
}
