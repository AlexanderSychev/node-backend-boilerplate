import { Logger as TypeORMLogger } from 'typeorm';
import { Logger as Log4JSLogger } from 'log4js';

export default class PostgreSQLDbLogger implements TypeORMLogger {
    private logger: Log4JSLogger;

    public constructor(logger: Log4JSLogger) {
        this.logger = logger;
    }

    public logQuery(query: string, parameters: any[] | undefined) {
        const sql = query + (parameters && parameters.length ? ` -- PARAMETERS: ${JSON.stringify(parameters)}` : '');
        this.logger.debug(`[QUERY]: ${sql}`);
    }

    public logQueryError(error: string, query: string, parameters: any[] | undefined) {
        const sql = query + (parameters && parameters.length ? ` -- PARAMETERS: ${JSON.stringify(parameters)}` : '');
        this.logger.error(`[FAILED QUERY]: ${sql}`);
        this.logger.error(`[QUERY ERROR]: ${error}`);
    }

    public logQuerySlow(time: number, query: string, parameters?: any[] | undefined) {
        const sql = query + (parameters && parameters.length ? ` -- PARAMETERS: ${JSON.stringify(parameters)}` : '');
        this.logger.warn(`[SLOW QUERY: ${time} ms]: ${sql}`);
    }

    public logSchemaBuild(message: string) {
        this.logger.debug(message);
    }

    public logMigration(message: string) {
        this.logger.info(message);
    }

    public log(level: 'log' | 'info' | 'warn', message: any) {
        this.logger.log(level, message);
    }
}
