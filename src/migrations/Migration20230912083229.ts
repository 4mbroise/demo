import { Migration } from '@mikro-orm/migrations';

export class Migration20230912083229 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "ue" drop constraint "ue_pkey";');
    this.addSql('alter table "ue" add constraint "ue_pkey" primary key ("ue_name", "cursus_cursus_name");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "ue" drop constraint "ue_pkey";');
    this.addSql('alter table "ue" add constraint "ue_pkey" primary key ("ue_name");');
  }

}
