import { sortBy, groupBy } from 'lodash';
import { MigrationInterface } from 'typeorm';

import CreateArticleTable from './CreateArticleTable';
import CreateUserTable from './CreateUserTable';

interface MigrationClass extends Function {
    new(): MigrationInterface;
    readonly timestamp: number;
    readonly target: string
}

const migrations: MigrationClass[] = [
    CreateArticleTable,
    CreateUserTable,
];

export default groupBy(sortBy(migrations, 'timestamp'), 'target');
