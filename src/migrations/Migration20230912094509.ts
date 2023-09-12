import { Migration } from '@mikro-orm/migrations';

export class Migration20230912094509 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "exam" ("cursus_cursus_name" varchar(255) not null, "ue_ue_name" varchar(255) not null, "ue_cursus_cursus_name" varchar(255) not null, "student_user_id" varchar(255) not null, "mark" int not null, constraint "exam_pkey" primary key ("cursus_cursus_name", "ue_ue_name", "ue_cursus_cursus_name", "student_user_id"));');

    this.addSql('alter table "exam" add constraint "exam_cursus_cursus_name_foreign" foreign key ("cursus_cursus_name") references "cursus" ("cursus_name") on update cascade;');
    this.addSql('alter table "exam" add constraint "exam_ue_ue_name_ue_cursus_cursus_name_foreign" foreign key ("ue_ue_name", "ue_cursus_cursus_name") references "ue" ("ue_name", "cursus_cursus_name") on update cascade;');
    this.addSql('alter table "exam" add constraint "exam_student_user_id_foreign" foreign key ("student_user_id") references "student" ("user_id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "exam" cascade;');
  }

}
