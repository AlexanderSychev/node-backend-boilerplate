import { Document } from 'yaml';
import { YAMLMap, YAMLSeq } from 'yaml/types';

import LoggerData from './LoggerData';
import { ILogConfig, ILoggerData } from './interfaces';

export default class LogConfig implements ILogConfig {
    private readonly data: YAMLMap;

    public constructor(document: Document.Parsed) {
        this.data = document.get('log')
    }

    public get level(): string {
        return this.data.get('level');
    }

    public get loggers(): ILoggerData[] {
        const loggers: YAMLSeq = this.data.get('loggers')
        return (<YAMLMap[]>loggers.items).map(item => new LoggerData(item));
    }
}
