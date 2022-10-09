import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateItem1665304741275 implements MigrationInterface {
    name = 'CreateItem1665304741275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "memo"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ADD "memo" character varying NOT NULL`);
    }

}
