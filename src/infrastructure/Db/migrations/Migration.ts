import * as knex from 'knex';
import { MigrationInterface, QueryRunner } from 'typeorm';

export default abstract class Migration implements MigrationInterface {
    /** "Knex.JS" instance for more effective query building */
    private readonly knex: knex;

    /**
     * @param timestamp
     * @param forConnector
     * @param dbms
     */
    protected constructor(dbms: string) {
        this.knex = knex({ client: dbms });
    }

    public async up(runner: QueryRunner): Promise<void> {
        await this.upInternal(runner, this.knex);
    }

    public async down(runner: QueryRunner): Promise<void> {
        await this.downInternal(runner, this.knex);
    }

    /** Run migration code */
    protected abstract upInternal(runner: QueryRunner, knex?: knex): Promise<void> | void;

    /** Revert migration code */
    protected abstract downInternal(runner: QueryRunner, knex?: knex): Promise<void> | void;
}
