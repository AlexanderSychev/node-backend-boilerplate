import { Document } from 'yaml';
import { YAMLMap } from 'yaml/types';

import { IDBConfig } from './interfaces';

export default class DBConfig implements IDBConfig {
    private readonly data: YAMLMap;

    public constructor(document: Document.Parsed) {
        this.data = document.get('db')
    }

    public get host(): string {
        return this.data.get('host');
    }

    public get port(): number {
        return this.data.get('port');
    }

    public get database(): string {
        return this.data.get('database');
    }

    public get username(): string {
        return this.data.get('username');
    }

    public get password(): string {
        return this.data.get('password');
    }
}
