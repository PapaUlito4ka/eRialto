import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoryAlterProduct1680042093863 implements MigrationInterface {
    name = 'CreateCategoryAlterProduct1680042093863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "name" character varying(64) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "categoryId"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
