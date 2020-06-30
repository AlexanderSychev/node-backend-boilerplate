import { Container } from 'inversify';
import { ApplicationModule } from '@core';
import Repositories from '@domain/Repositories';

import ArticleUseCases from './ArticleUseCases';
import UserUseCases from './UserUseCases';

export default class UseCases extends ApplicationModule {
    public constructor() {
        super('@domain/UseCases', [Repositories]);
    }

    protected async loadInternal(container: Container): Promise<void> {
        container.bind<ArticleUseCases>(ArticleUseCases).to(ArticleUseCases);
        container.bind<UserUseCases>(UserUseCases).to(UserUseCases);
    }
}
