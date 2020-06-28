import { Container } from 'inversify';
import { ApplicationModule } from '@core';

import HelloController from './HelloController';

export const Controllers = Symbol('Controllers');

export default class ControllersModule extends ApplicationModule {
    public constructor() {
        super('@domain/Controllers');
    }

    public loadInternal(container: Container) {
        container.bind<Function[]>(Controllers).toConstantValue([HelloController])
    }
}
