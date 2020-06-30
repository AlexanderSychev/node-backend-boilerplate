import { IGetBodyResult, ITransformableError } from '@infrastructure/Http';

export default class UseCaseError<T = {}> extends Error implements ITransformableError<T> {
    private statusCode: number

    private details?: T;

    public constructor(statusCode: number, message?: string, details?: T) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }

    public getBody(): IGetBodyResult<T> {
        return {
            statusCode: this.statusCode,
            message: this.message,
            details: this.details,
        };
    }
}
