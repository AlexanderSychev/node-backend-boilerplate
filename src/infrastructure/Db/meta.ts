import { ObjectType, EntitySchema, Repository, EntityManager } from 'typeorm';

// There can be several databases using different DMBSs (PostgreSQL, MongoDB etc.)

/** Main database connector (PostgreSQL RDBMS) */
export const MainDatabaseConnector = Symbol('MainDatabaseConnector');

/** TypeORM connector - wraps all basic work with database connection and ORM mapping */
export interface IDbConnector {
    /** Unique name for connector */
    readonly name: string;
    /** Established database connection flag */
    readonly isConnected: boolean;
    /** Get repository for TypeORM entity */
    getRepository<T>(entity: ObjectType<T> | EntitySchema<T> | string): Promise<Repository<T>>;
    /** Run several queries as one atomic operation */
    transaction<T>(callback: (manager: EntityManager) => Promise<T>): Promise<T>
    /** Run's all pending migrations (usually, needed for RDBMS) */
    migrate(): Promise<void>;
    /** Revert N last migrations (usually, needed for RDBMS) */
    revert(n?: number): Promise<void>;
}
