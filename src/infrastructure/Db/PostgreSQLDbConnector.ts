import { inject, injectable } from 'inversify';
import { Logger } from 'log4js';
import { createConnection, Connection, ObjectType, EntitySchema, Repository, EntityManager } from 'typeorm';
import { DBConfig, IDBConfig } from '@infrastructure/Config';
import { DatabaseLog } from '@infrastructure/Log';

import { main } from './migrations';
import { IDbConnector } from './meta';
import { User, Article } from './models';
import { PostgreSQLDbLogger } from './loggers';

@injectable()
export default class PostgreSQLDbConnector implements IDbConnector {
    @inject(DBConfig)
    private config: IDBConfig;

    @inject(DatabaseLog)
    private logger: Logger;

    private connection: Connection | null = null;

    public get name(): string {
        return 'main';
    }

    public get isConnected(): boolean {
        return this.connection && this.connection.isConnected;
    }

    public async getRepository<T>(entity: ObjectType<T> | EntitySchema<T> | string): Promise<Repository<T>> {
        const connection = await this.getConnection();
        return connection.getRepository(entity);
    }

    public async transaction<T>(callback: (manager: EntityManager) => Promise<T>): Promise<T> {
        const connection = await this.getConnection();
        const result = await connection.transaction(callback)
        return result
    }

    public async migrate(): Promise<void> {
        const connection = await this.getConnection();
        await connection.runMigrations({ transaction: 'all' });
    }

    public async revert(n: number = 1): Promise<void> {
        const connection = await this.getConnection();
        for (let i = 0; i < n; i++) {
            await connection.undoLastMigration({ transaction: 'all' });
        }
    }

    private async getConnection(): Promise<Connection> {
        if (!this.connection) {
            this.connection = await createConnection({
                type: 'postgres',
                logger: new PostgreSQLDbLogger(this.logger),
                host: this.config.host,
                port: this.config.port,
                database: this.config.database,
                username: this.config.username,
                password: this.config.password,
                migrations: main,
                entities: [
                    User,
                    Article,
                ]
            });
            if (!this.connection.isConnected) {
                await this.connection.connect();
            }
        }
        return this.connection;
    }
}
