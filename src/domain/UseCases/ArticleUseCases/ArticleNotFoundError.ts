import { NotFoundError } from '../errors';

export interface ArticleNotFoundErrorDetails {
    articleId: number;
    useCase?: string;
}

export default class ArticleNotFoundError extends NotFoundError<ArticleNotFoundErrorDetails> {
    public constructor(details: ArticleNotFoundErrorDetails) {
        super(`Can't find article with id=${details.articleId}`, details);
    }
}
