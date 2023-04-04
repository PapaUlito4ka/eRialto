import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedCreatedUpdatedMixin1680645179470 implements MigrationInterface {
    name = 'AddedCreatedUpdatedMixin1680645179470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_profiles" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users_profiles" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD "address" character varying(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "images" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users_profiles" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users_profiles" DROP COLUMN "createdAt"`);
    }

}
