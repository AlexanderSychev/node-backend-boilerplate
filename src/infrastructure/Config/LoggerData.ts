import { YAMLMap } from 'yaml/types';

import { ILoggerData } from './interfaces';

export default class LoggerData implements ILoggerData {
    private data: YAMLMap;

    public constructor(data: YAMLMap) {
        this.data = data;
    }

    public get name(): string {
        return this.data.get('name');
    }

    public get type(): string {
        return this.data.get('type');
    }
}
