import { Container } from 'inversify';
import { ApplicationModule } from '@core';

import ArticleController from './ArticleController';
import UserController from './UserController';

export const Controllers = Symbol('Controllers');

export default class ControllersModule extends ApplicationModule {
    public constructor() {
        super('@domain/Controllers');
    }

    public async loadInternal(container: Container) {
        container.bind<Function[]>(Controllers).toConstantValue([
            ArticleController,
            UserController
        ])
    }
}
