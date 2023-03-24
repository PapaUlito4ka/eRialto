import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUserProfileAndProduct1679609568361 implements MigrationInterface {
    name = 'AddedUserProfileAndProduct1679609568361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_profiles" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "firstname" character varying(64) NOT NULL, "lastname" character varying(64) NOT NULL, "salt" character varying(256) NOT NULL, "userId" integer NOT NULL, CONSTRAINT "REL_1cfade2944c4f57894eb1e4af3" UNIQUE ("userId"), CONSTRAINT "PK_e7a7f7db3fc96700d9239e43cda" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "name" character varying(128) NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "userId" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users_profiles" ADD CONSTRAINT "FK_1cfade2944c4f57894eb1e4af34" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9"`);
        await queryRunner.query(`ALTER TABLE "users_profiles" DROP CONSTRAINT "FK_1cfade2944c4f57894eb1e4af34"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "users_profiles"`);
    }

}
