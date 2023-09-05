import { Migration } from '@mikro-orm/migrations';

export class Migration20230905103157 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "cursus" ("cursus_name" varchar(255) not null, constraint "cursus_pkey" primary key ("cursus_name"));');

    this.addSql('alter table "cursus_responsible" add column "cursus_cursus_name" varchar(255) null;');
    this.addSql('alter table "cursus_responsible" add constraint "cursus_responsible_cursus_cursus_name_foreign" foreign key ("cursus_cursus_name") references "cursus" ("cursus_name") on update cascade on delete set null;');

    this.addSql('alter table "student" add column "cursus_cursus_name" varchar(255) null;');
    this.addSql('alter table "student" add constraint "student_cursus_cursus_name_foreign" foreign key ("cursus_cursus_name") references "cursus" ("cursus_name") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "cursus_responsible" drop constraint "cursus_responsible_cursus_cursus_name_foreign";');

    this.addSql('alter table "student" drop constraint "student_cursus_cursus_name_foreign";');

    this.addSql('drop table if exists "cursus" cascade;');

    this.addSql('alter table "cursus_responsible" drop column "cursus_cursus_name";');

    this.addSql('alter table "student" drop column "cursus_cursus_name";');
  }

}
