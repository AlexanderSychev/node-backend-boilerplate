import knex from 'knex';
import { QueryRunner } from 'typeorm';

import Migration from '../Migration';

export default class CreateArticleTable1593436930144 extends Migration {
    public constructor() {
        super('pg');
    }

    protected async upInternal(runner: QueryRunner, knex: knex) {
        const query = knex.schema.createTable('articles', builder => {
            builder.bigIncrements('id');
            builder.string('title', 255);
            builder.text('content');
            builder.timestamp('created_at');
            builder.timestamp('updated_at');
            builder.bigInteger('author_id').references('id').inTable('users');
        });
        await runner.query(query.toString());
    }

    protected downInternal(runner: QueryRunner) {
        return runner.dropTable('articles');
    }
}
