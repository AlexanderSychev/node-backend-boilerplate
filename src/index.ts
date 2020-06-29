import './bootstrap';

import { Command } from 'commander';
import { Application, container } from '@core';
import Http, { Server, IServer } from '@infrastructure/Http';
import Db, { MainDatabaseConnector, IDbConnector } from '@infrastructure/Db'

const app = new Application([Db, Http]);
const cli = new Command();

cli
    .command('start')
    .description('Start server')
    .action(async () => {
        await app.bootstrap();
        const server = container.get<IServer>(Server);
        await server.start();
    });

cli
    .command('migrate')
    .description('Run all pending migrations')
    .action(async () => {
        await app.bootstrap();
        const connector = container.get<IDbConnector>(MainDatabaseConnector);
        await connector.migrate();
    });

cli
    .command('revert [count]')
    .description('Revert [count] last migrations')
    .action(async (count?: number) => {
        await app.bootstrap();
        const connector = container.get<IDbConnector>(MainDatabaseConnector);
        await connector.revert(count);
    });

cli.parse(process.argv);
