import knex from 'knex';
import { QueryRunner } from 'typeorm';

import Migration from '../Migration';

export class CreateUserTable1593436930134 extends Migration {
    public constructor() {
        super('pg');
    }

    protected async upInternal(runner: QueryRunner, knex: knex) {
        const query = knex.schema.createTable('users', builder => {
            builder.bigIncrements('id');
            builder.string('name', 255);
            builder.timestamp('created_at');
            builder.timestamp('updated_at');
        });
        await runner.query(query.toString());
    }

    protected downInternal(runner: QueryRunner) {
        return runner.dropTable('users');
    }
}
