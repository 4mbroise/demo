import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiKey } from '../../api-key/apiKey.entity';

@Entity()
export abstract class Person {
  @PrimaryKey()
  userID!: string;

  @Property()
  lastName!: string;

  @Property()
  firstName!: string;
}
