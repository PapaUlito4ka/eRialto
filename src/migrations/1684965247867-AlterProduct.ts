import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterProduct1684965247867 implements MigrationInterface {
    name = 'AlterProduct1684965247867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "address" character varying(256) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "address" character varying(64) NOT NULL`);
    }

}
