import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateItem1665305267613 implements MigrationInterface {
    name = 'CreateItem1665305267613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ADD "mem" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "mem"`);
    }

}
