import { Migration } from '@mikro-orm/migrations';

export class Migration20230902125836 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "student" ("user_id" varchar(255) not null, "last_name" varchar(255) not null, "first_name" varchar(255) not null, constraint "student_pkey" primary key ("user_id"));',
    );
  }
}
