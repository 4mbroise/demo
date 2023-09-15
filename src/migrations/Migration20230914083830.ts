import { Migration } from '@mikro-orm/migrations';

export class Migration20230914083830 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "api_key" add column "roles" text[] not null default \'{noRole}\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "api_key" drop column "roles";');
  }

}
