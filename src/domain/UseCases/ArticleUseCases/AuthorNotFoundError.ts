import { NotFoundError } from '../errors';

export interface AuthorNotFoundErrorDetails {
    authorId: number;
    articleId?: number;
    useCase?: string;
}

export default class ArticleNotFoundError extends NotFoundError<AuthorNotFoundErrorDetails> {
    public constructor(details: AuthorNotFoundErrorDetails) {
        super(
            ArticleNotFoundError.buildMessage(details),
            details
        );
    }

    private static buildMessage({ authorId, articleId }: AuthorNotFoundErrorDetails): string {
        let result: string = `Can't find author with id=${authorId}`;
        if (articleId) {
            result = `${result} for article with id=${articleId}`;
        }
        return result;
    }
}
