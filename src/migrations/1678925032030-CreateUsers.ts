import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1678925032030 implements MigrationInterface {
    name = 'CreateUsers1678925032030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "email" character varying(64) NOT NULL, "password" character varying(256) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
