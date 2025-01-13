import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntity1736714663802 implements MigrationInterface {
    name = 'CreateEntity1736714663802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying, "about" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "zipcode" character varying NOT NULL, "birthday" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "onboarding_order_entity" ("id" SERIAL NOT NULL, "addressStep" integer NOT NULL, "birthdayStep" integer NOT NULL, "aboutStep" integer NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c187d34e8ee30213261b0ec5c02" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "onboarding_order_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
