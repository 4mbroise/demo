import { Entity, ManyToOne, PrimaryKey, PrimaryKeyType } from '@mikro-orm/core';
import { Cursus } from '../../cursus/entities/cursus.entity';

@Entity()
export class Ue {
  @PrimaryKey()
  ueName: string;

  @ManyToOne()
  cursus: Cursus;

  [PrimaryKeyType]?: [string, string];
}
