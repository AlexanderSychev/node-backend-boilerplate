import { NotFoundError } from '../errors';

export interface UserNotFoundErrorDetails {
    userId: number;
    useCase?: string;
}

export default class UserNotFoundError extends NotFoundError<UserNotFoundErrorDetails> {
    public constructor(details: UserNotFoundErrorDetails) {
        super(`Can't find user with id=${details.userId}`, details);
    }
}
