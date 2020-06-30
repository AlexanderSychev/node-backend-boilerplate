import { inject, injectable } from 'inversify';
import { MainDatabaseConnector, IDbConnector, User } from '@infrastructure/Db';

import { IItemsPage, IUsersRepository } from './meta';

@injectable()
export default class UsersRepository implements IUsersRepository {
    @inject(MainDatabaseConnector)
    private connector: IDbConnector;

    public async getUserById(id: number): Promise<User | null> {
        const repository = await this.connector.getRepository(User);
        const user = await repository.findOne({ id });
        return user;
    }

    public async saveUser(user: User): Promise<User> {
        const repository = await this.connector.getRepository(User);
        const savedUser = await repository.save(user);
        return savedUser;
    }

    public async getUsersList(page: number, pageSize: number): Promise<IItemsPage<User>> {
        const repository = await this.connector.getRepository(User);
        const usersCount = await repository.count();
        const countPages = Math.ceil(usersCount / pageSize);
        const builder = repository
            .createQueryBuilder()
            .limit(pageSize)
            .offset(page * (pageSize - 1));
        const items = await builder.getMany();

        return {
            items,
            page,
            countPages,
        };
    }

    public async removeUser(user: User): Promise<void> {
        const repository = await this.connector.getRepository(User);
        await repository.remove(user);
    }
}
