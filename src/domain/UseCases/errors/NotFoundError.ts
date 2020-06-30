import UseCaseError from './UseCaseError';

export default class NotFoundError<T = {}> extends UseCaseError<T> {
    public constructor(message?: string, details?: T) {
        super(404, message, details);
    }
}
