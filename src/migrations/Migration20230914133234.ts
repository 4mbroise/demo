import { Migration } from '@mikro-orm/migrations';

export class Migration20230914133234 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "person" ("user_id" varchar(255) not null, "last_name" varchar(255) not null, "first_name" varchar(255) not null, constraint "person_pkey" primary key ("user_id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "person" cascade;');
  }

}
