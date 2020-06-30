import { inject, injectable } from 'inversify';
import { FindOneOptions } from 'typeorm';
import { MainDatabaseConnector, IDbConnector, User, Article } from '@infrastructure/Db';

import { IItemsPage, IArticlesRepository } from './meta';

@injectable()
export default class ArticlesRepository implements IArticlesRepository {
    @inject(MainDatabaseConnector)
    private connector: IDbConnector;

    public async getArticleById(id: number, withAuthor: boolean): Promise<Article | null> {
        const repository = await this.connector.getRepository(Article);

        const options: FindOneOptions<Article> = {};
        if (withAuthor) {
            options.relations = ['author'];
        }

        const article = await repository.findOne(id, options);
        return article;
    }

    public async saveArticle(article: Article): Promise<Article> {
        const repository = await this.connector.getRepository(Article);
        const savedArticle = await repository.save(article);
        return savedArticle;
    }

    public async getArticlesByAuthor(author: User): Promise<Article[]> {
        const repository = await this.connector.getRepository(Article);
        const articles = await repository.find({ authorId: author.id });
        return articles;
    }

    public async getArticlesList(page: number, pageSize: number): Promise<IItemsPage<Article>> {
        const repository = await this.connector.getRepository(Article);
        const articlesCount = await repository.count();
        const countPages = Math.ceil(articlesCount / pageSize);
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

    public async removeArticle(article: Article) {
        const repository = await this.connector.getRepository(Article);
        await repository.remove(article);
    }

    public async bulkRemoveArticles(articles: Article[]) {
        const repository = await this.connector.getRepository(Article);
        await repository.remove(articles);
    }
}
