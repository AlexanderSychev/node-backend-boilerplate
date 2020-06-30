import { injectable, inject } from 'inversify';
import { isNil } from 'lodash';
import { UsersRepository, IUsersRepository, ArticlesRepository, IArticlesRepository } from '@domain/Repositories';
import { Article } from '@infrastructure/Db';

import ArticleNotFoundError from './ArticleNotFoundError';
import AuthorNotFoundError from './AuthorNotFoundError';

export interface EditArticleParams {
    title?: string;
    content?: string;
}

@injectable()
export default class ArticleUseCases {
    @inject(UsersRepository)
    private usersRepository: IUsersRepository;

    @inject(ArticlesRepository)
    private articlesRepository: IArticlesRepository;

    public async getArticleById(articleId: number, withAuthor: boolean = false): Promise<Article> {
        const article = await this.articlesRepository.getArticleById(articleId, withAuthor);
        if (!article) {
            throw new ArticleNotFoundError({ articleId, useCase: 'getArticleById' })
        }
        return article;
    }

    public async createNewArticle(title: string, content: string, authorId: number): Promise<Article> {
        const author = await this.usersRepository.getUserById(authorId);
        if (!author) {
            throw new AuthorNotFoundError({ authorId, useCase: 'createNewArticle' });
        }

        let article = new Article();
        article.title = title;
        article.content = content;
        article.createdAt = new Date();
        article.updatedAt = article.createdAt;
        article.authorId = authorId;
        article.author = author;

        article = await this.articlesRepository.saveArticle(article);

        return article
    }

    public async editArticle(articleId: number, { title, content }: EditArticleParams) {
        let article = await this.articlesRepository.getArticleById(articleId, false);
        if (!article) {
            throw new ArticleNotFoundError({ articleId, useCase: 'editArticle' })
        }

        if (!isNil(title)) {
            article.title = title;
        }

        if (!isNil(content)) {
            article.content = content;
        }

        // Set updating timestamp only when title or content was updated
        if (!isNil(title) || !isNil(content)) {
            article.updatedAt = new Date();
        }

        article = await this.articlesRepository.saveArticle(article);

        return article;
    }

    public async getArticlesByAuthor(authorId: number): Promise<Article[]> {
        let article = await this.usersRepository.getUserById(authorId);
        if (!article) {
            throw new AuthorNotFoundError({ authorId, useCase: 'getArticlesByAuthor' });
        }

        const articles = await this.articlesRepository.getArticlesByAuthor(article);
        return articles;
    }

    public async removeArticle(articleId: number): Promise<void> {
        const article = await this.articlesRepository.getArticleById(articleId, false);
        if (!article) {
            throw new ArticleNotFoundError({ articleId, useCase: 'getArticleById' })
        }

        await this.articlesRepository.removeArticle(article);
    }
}
