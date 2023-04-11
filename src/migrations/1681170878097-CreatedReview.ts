import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedReview1681170878097 implements MigrationInterface {
    name = 'CreatedReview1681170878097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reviews" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "body" character varying(256) NOT NULL, "rating" integer NOT NULL, "fromUserId" integer NOT NULL, "toUserId" integer NOT NULL, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD "isArchived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_2042006fc63095e96074aa40af8" FOREIGN KEY ("fromUserId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_47c70a219cb4b12536c7d28b798" FOREIGN KEY ("toUserId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_47c70a219cb4b12536c7d28b798"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_2042006fc63095e96074aa40af8"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "isArchived"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
    }

}
