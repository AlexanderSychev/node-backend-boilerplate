import { Container } from 'inversify';
import { ApplicationModule } from '@core';
import Log from '@infrastructure/Log';
import Config from '@infrastructure/Config';
import Controllers from '@domain/Controllers';

import Server from './Server';
import { IServer, Server as SServer } from './meta';

export default class Http extends ApplicationModule {
    public constructor() {
        super('@infrastructure/Http', [Config, Log, Controllers])
    }

    protected async initInternal(container: Container) {
        container.bind<IServer>(SServer).to(Server);
    }
}
