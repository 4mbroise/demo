import { Entity, ManyToOne } from '@mikro-orm/core';
import { Person } from '../../shared/entities/person.entity';
import { Cursus } from '../../cursus/entities/cursus.entity';

@Entity()
export class CursusResponsible extends Person {
  @ManyToOne({
    serializer: (cursus: Cursus) => {
      if (!!cursus) {
        return cursus.cursusName;
      }
      return null;
    },
  })
  cursus?: Cursus;
}
