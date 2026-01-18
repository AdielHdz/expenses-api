import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1768617599380 implements MigrationInterface {
    name = 'InitSchema1768617599380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "expense" ("id" BIGSERIAL NOT NULL, "description" character varying NOT NULL, "amount" numeric NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT NOW(), "category" character varying(50) NOT NULL, CONSTRAINT "PK_edd925b450e13ea36197c9590fc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "expense"`);
    }

}
