import { Container } from 'inversify';
import { ApplicationModule } from '@core';

import YamlLoader from './YamlLoader';
import DBConfig from './DBConfig';
import LogConfig from './LogConfig';
import ServerConfig from './ServerConfig';
import { IDBConfig, ILogConfig, IServerConfig } from './interfaces';
import { DBConfig as SDBConfig, LogConfig as SLogConfig, ServerConfig as SServerConfig } from './identifiers'

export default class Config extends ApplicationModule {
    public constructor() {
        super('@infrastructure/Config');
    }

    protected async initInternal(container: Container) {
        const loader = new YamlLoader();
        const document = await loader.load();

        container.bind<IDBConfig>(SDBConfig).toConstantValue(new DBConfig(document));
        container.bind<ILogConfig>(SLogConfig).toConstantValue(new LogConfig(document));
        container.bind<IServerConfig>(SServerConfig).toConstantValue(new ServerConfig(document));
    }
}
