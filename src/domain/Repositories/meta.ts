import { User, Article } from '@infrastructure/Db';

/** Item's page */
export interface IItemsPage<T> {
    page: number;
    countPages: number;
    items: T[];
}

/** User's repository service identifier */
export const UsersRepository = Symbol('UsersRepository');

/** Users' repository */
export interface IUsersRepository {
    /** Get user by it's identifier */
    getUserById(id: number): Promise<User | null>;
    /** Save user in database */
    saveUser(user: User): Promise<User>;
    /** Get users' list with pagination */
    getUsersList(page: number, pageSize: number): Promise<IItemsPage<User>>;
    /** Remove user from repository */
    removeUser(user: User): Promise<void>;
}

/** Articles' repository service identifier */
export const ArticlesRepository = Symbol('ArticlesRepository');

/** Articles' repository */
export interface IArticlesRepository {
    /** Get article by identifier */
    getArticleById(id: number, withAuthor: boolean): Promise<Article | null>;
    /** Save article in database */
    saveArticle(article: Article): Promise<Article>;
    /** Get articles by author */
    getArticlesByAuthor(author: User): Promise<Article[]>;
    /** Get articles' list with pagination */
    getArticlesList(page: number, pageSize: number): Promise<IItemsPage<Article>>;
    /** Remove article from database */
    removeArticle(article: Article): Promise<void>;
    /** Remove list of articles at once */
    bulkRemoveArticles(articles: Article[]): Promise<void>;
}
