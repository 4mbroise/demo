import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  PrimaryKeyType,
} from '@mikro-orm/core';
import { Cursus } from '../../cursus/entities/cursus.entity';
import { Exam } from '../../exams/entities/exam.entity';

@Entity()
export class Ue {
  @PrimaryKey()
  ueName: string;

  @ManyToOne({
    primary: true,
    serializer: (cursus: Cursus) => cursus.cursusName,
  })
  cursus: Cursus;

  @OneToMany(() => Exam, (exam) => exam.ue)
  exams = new Collection<Exam>(this);

  [PrimaryKeyType]?: [string, string];
}
