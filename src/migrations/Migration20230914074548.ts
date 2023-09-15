import { Migration } from '@mikro-orm/migrations';

export class Migration20230914074548 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "api_key" ("api_key" varchar(255) not null, constraint "api_key_pkey" primary key ("api_key"));');

    this.addSql('alter table "cursus_responsible" add column "api_key_api_key" varchar(255) null;');
    this.addSql('alter table "cursus_responsible" add constraint "cursus_responsible_api_key_api_key_foreign" foreign key ("api_key_api_key") references "api_key" ("api_key") on update cascade on delete set null;');
    this.addSql('alter table "cursus_responsible" add constraint "cursus_responsible_api_key_api_key_unique" unique ("api_key_api_key");');

    this.addSql('alter table "student" add column "api_key_api_key" varchar(255) null;');
    this.addSql('alter table "student" add constraint "student_api_key_api_key_foreign" foreign key ("api_key_api_key") references "api_key" ("api_key") on update cascade on delete set null;');
    this.addSql('alter table "student" add constraint "student_api_key_api_key_unique" unique ("api_key_api_key");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "cursus_responsible" drop constraint "cursus_responsible_api_key_api_key_foreign";');

    this.addSql('alter table "student" drop constraint "student_api_key_api_key_foreign";');

    this.addSql('drop table if exists "api_key" cascade;');

    this.addSql('alter table "cursus_responsible" drop constraint "cursus_responsible_api_key_api_key_unique";');
    this.addSql('alter table "cursus_responsible" drop column "api_key_api_key";');

    this.addSql('alter table "student" drop constraint "student_api_key_api_key_unique";');
    this.addSql('alter table "student" drop column "api_key_api_key";');
  }

}
