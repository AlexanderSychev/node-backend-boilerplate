export interface IServerConfig {
    readonly host: string;
    readonly port: number;
}

export interface IDBConfig {
    readonly host: string;
    readonly port: number;
    readonly database: string;
    readonly username: string;
    readonly password: string;
}

export interface ILoggerData {
    readonly name: string;
    readonly type: string;
}

export interface ILogConfig {
    readonly level: string;
    readonly loggers: ILoggerData[];
}
