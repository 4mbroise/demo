import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ abstract: true })
export class Person {
  @PrimaryKey()
  userID!: string;

  @Property()
  lastName!: string;

  @Property()
  firstName!: string;
}
