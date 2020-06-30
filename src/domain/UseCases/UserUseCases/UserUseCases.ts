import { injectable, inject } from 'inversify';
import { UsersRepository, IUsersRepository, ArticlesRepository, IArticlesRepository } from '@domain/Repositories';
import { User } from '@infrastructure/Db';

import UserNotFoundError from './UserNotFoundError';

@injectable()
export default class UserUseCases {
    @inject(UsersRepository)
    private usersRepository: IUsersRepository;

    @inject(ArticlesRepository)
    private articlesRepository: IArticlesRepository;

    public async getUserById(id: number): Promise<User> {
        const user = await this.usersRepository.getUserById(id);
        if (!user) {
            throw new UserNotFoundError({ userId: id, useCase: 'getUserById' });
        }
        return user;
    }

    public async createNewUser(username: string): Promise<User> {
        let user = new User();
        user.name = username;
        user.createdAt = new Date();
        user.updatedAt = user.createdAt;

        user = await this.usersRepository.saveUser(user);

        return user;
    }

    public async renameUser(userId: number, username: string): Promise<User> {
        let user = await this.usersRepository.getUserById(userId);
        if (!user) {
            throw new UserNotFoundError({ userId, useCase: 'renameUser' });
        }

        user.name = username;
        user.updatedAt = new Date();

        user = await this.usersRepository.saveUser(user);

        return user;
    }

    public async removeUser(userId: number): Promise<void> {
        const user = await this.usersRepository.getUserById(userId);
        if (!user) {
            throw new UserNotFoundError({ userId, useCase: 'removeUser' });
        }

        const articles = await this.articlesRepository.getArticlesByAuthor(user);
        if (articles.length > 0) {
            await this.articlesRepository.bulkRemoveArticles(articles);
        }

        await this.usersRepository.removeUser(user);
    }
}
