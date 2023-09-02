import { Entity } from '@mikro-orm/core';
import { Person } from '../../shared/entities/person.entity';

@Entity()
export class Student extends Person {}
