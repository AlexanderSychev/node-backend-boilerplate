import { Container } from 'inversify';
import { ApplicationModule } from '@core';
import { configure, getLogger, Appender, Logger } from 'log4js'
import Config, { LogConfig, ILogConfig } from '@infrastructure/Config';

import { HttpLog, DatabaseLog, DefaultLog } from './identifiers';
import { Dictionary } from 'lodash';

export default class Log extends ApplicationModule {
    public constructor() {
        super('@infrastructure/Log', [Config])
    }

    protected async initInternal(container: Container) {
        const config = container.get<ILogConfig>(LogConfig);

        const appenders: Dictionary<Appender> = {};
        for (const { name, type } of config.loggers) {
            appenders[name] = { type }
        }

        configure({
            appenders,
            categories: {
                default: {
                    level: config.level,
                    appenders: config.loggers.map(logger => logger.name)
                }
            }
        });

        container.bind<Logger>(HttpLog).toConstantValue(getLogger('http'));
        container.bind<Logger>(DatabaseLog).toConstantValue(getLogger('database'));
        container.bind<Logger>(DefaultLog).toConstantValue(getLogger('default'));
    }
}
