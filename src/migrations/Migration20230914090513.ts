import { Migration } from '@mikro-orm/migrations';

export class Migration20230914090513 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "api_key" add column "is_admin" boolean not null default false, add column "is_student" boolean not null default false, add column "is_responsible" boolean not null default false;');
    this.addSql('alter table "api_key" drop column "roles";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "api_key" add column "roles" text[] not null default \'{noRole}\';');
    this.addSql('alter table "api_key" drop column "is_admin";');
    this.addSql('alter table "api_key" drop column "is_student";');
    this.addSql('alter table "api_key" drop column "is_responsible";');
  }

}
