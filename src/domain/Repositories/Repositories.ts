import { Container } from 'inversify';
import { ApplicationModule } from '@core';
import Db from '@infrastructure/Db';

import * as meta from './meta';
import ArticlesRepository from './ArticlesRepository';
import UsersRepository from './UsersRepository';

export default class Repositories extends ApplicationModule {
    public constructor() {
        super('@domain/Repositories', [Db]);
    }

    protected async loadInternal(container: Container) {
        container.bind<meta.IUsersRepository>(meta.UsersRepository).to(UsersRepository);
        container.bind<meta.IArticlesRepository>(meta.ArticlesRepository).to(ArticlesRepository);
    }
}
