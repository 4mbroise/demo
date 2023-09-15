import { Entity, ManyToOne, OneToOne } from '@mikro-orm/core';
import { Person } from '../../shared/entities/person.entity';
import { Cursus } from '../../cursus/entities/cursus.entity';
import { ApiKey } from '../../api-key/apiKey.entity';

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

  @OneToOne(() => ApiKey, (apiKey) => apiKey.cursusResponsible, {
    owner: true,
    serializer(value: ApiKey) {
      return value.apiKey;
    },
  })
  apiKey: ApiKey;
}
