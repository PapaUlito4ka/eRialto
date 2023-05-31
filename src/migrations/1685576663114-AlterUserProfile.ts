import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserProfile1685576663114 implements MigrationInterface {
    name = 'AlterUserProfile1685576663114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_profiles" ADD "phone" character varying(64)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_profiles" DROP COLUMN "phone"`);
    }

}
