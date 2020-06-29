import knex from 'knex';
import { QueryRunner } from 'typeorm';

import Migration from './Migration';

export default class CreateUserTable extends Migration {
    /** Migration creation date (for execution order) */
    public static readonly timestamp: number = 1593436930134;

    /** Name of target "IDbConnector" instance */
    public static readonly target: string = 'main';

    public constructor() {
        super('pg');
    }

    protected async upInternal(runner: QueryRunner, knex: knex) {
        const query = knex.schema.createTable('users', builder => {
            builder.bigIncrements('id');
            builder.string('name', 255);
            builder.timestamp('created_at');
        });
        await runner.query(query.toString());
    }

    protected downInternal(runner: QueryRunner) {
        return runner.dropTable('users');
    }
}
