import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserProfile1679617092325 implements MigrationInterface {
    name = 'AlterUserProfile1679617092325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_profiles" DROP COLUMN "salt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_profiles" ADD "salt" character varying(256) NOT NULL`);
    }

}
