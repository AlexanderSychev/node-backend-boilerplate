import { Document } from 'yaml';
import { YAMLMap } from 'yaml/types';

import { IServerConfig } from './interfaces';

export default class ServerConfig implements IServerConfig {
    private readonly data: YAMLMap;

    public constructor(document: Document.Parsed) {
        this.data = document.get('server')
    }

    public get host(): string {
        return this.data.get('host');
    }

    public get port(): number {
        return this.data.get('port');
    }
}
