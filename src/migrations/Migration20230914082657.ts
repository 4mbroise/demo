import { Migration } from '@mikro-orm/migrations';

export class Migration20230914082657 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "cursus_responsible" drop constraint "cursus_responsible_api_key_api_key_foreign";');

    this.addSql('alter table "student" drop constraint "student_api_key_api_key_foreign";');

    this.addSql('alter table "cursus_responsible" alter column "api_key_api_key" type varchar(255) using ("api_key_api_key"::varchar(255));');
    this.addSql('alter table "cursus_responsible" alter column "api_key_api_key" set not null;');
    this.addSql('alter table "cursus_responsible" add constraint "cursus_responsible_api_key_api_key_foreign" foreign key ("api_key_api_key") references "api_key" ("api_key") on update cascade;');

    this.addSql('alter table "student" alter column "api_key_api_key" type varchar(255) using ("api_key_api_key"::varchar(255));');
    this.addSql('alter table "student" alter column "api_key_api_key" set not null;');
    this.addSql('alter table "student" add constraint "student_api_key_api_key_foreign" foreign key ("api_key_api_key") references "api_key" ("api_key") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "cursus_responsible" drop constraint "cursus_responsible_api_key_api_key_foreign";');

    this.addSql('alter table "student" drop constraint "student_api_key_api_key_foreign";');

    this.addSql('alter table "cursus_responsible" alter column "api_key_api_key" type varchar(255) using ("api_key_api_key"::varchar(255));');
    this.addSql('alter table "cursus_responsible" alter column "api_key_api_key" drop not null;');
    this.addSql('alter table "cursus_responsible" add constraint "cursus_responsible_api_key_api_key_foreign" foreign key ("api_key_api_key") references "api_key" ("api_key") on update cascade on delete set null;');

    this.addSql('alter table "student" alter column "api_key_api_key" type varchar(255) using ("api_key_api_key"::varchar(255));');
    this.addSql('alter table "student" alter column "api_key_api_key" drop not null;');
    this.addSql('alter table "student" add constraint "student_api_key_api_key_foreign" foreign key ("api_key_api_key") references "api_key" ("api_key") on update cascade on delete set null;');
  }

}
