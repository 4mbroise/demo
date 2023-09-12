import { Migration } from '@mikro-orm/migrations';

export class Migration20230902153432 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "cursus_responsible" ("user_id" varchar(255) not null, "last_name" varchar(255) not null, "first_name" varchar(255) not null, constraint "cursus_responsible_pkey" primary key ("user_id"));',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "cursus_responsible" cascade;');
  }
}
