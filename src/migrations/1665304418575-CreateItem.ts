import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateItem1665304418575 implements MigrationInterface {
    name = 'CreateItem1665304418575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ADD "memo" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "memo"`);
    }

}
