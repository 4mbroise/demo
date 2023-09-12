import { Migration } from '@mikro-orm/migrations';

export class Migration20230905144230 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "ue" ("ue_name" varchar(255) not null, "cursus_cursus_name" varchar(255) not null, constraint "ue_pkey" primary key ("ue_name"));');

    this.addSql('alter table "ue" add constraint "ue_cursus_cursus_name_foreign" foreign key ("cursus_cursus_name") references "cursus" ("cursus_name") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "ue" cascade;');
  }

}
