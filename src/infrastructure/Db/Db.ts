import { Container } from 'inversify';
import { ApplicationModule } from '@core';
import Config from '@infrastructure/Config';

import PostgreSQLDbConnector from './PostgreSQLDbConnector';
import { MainDatabaseConnector, IDbConnector } from './meta';

export default class Db extends ApplicationModule {
    public constructor() {
        super('@infrastructure/Db', [Config]);
    }

    protected async loadInternal(container: Container): Promise<void> {
        container.bind<IDbConnector>(MainDatabaseConnector).to(PostgreSQLDbConnector);
    }
}
