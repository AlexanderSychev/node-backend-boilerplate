import { HttpError } from 'routing-controllers';

export default class NotFound extends HttpError {
    public constructor(message?: string) {
        super(404, message);
    }

    public toJSON() {
        return {
            statusCode: this.httpCode,
            statusMessage: this.name
        }
    }
}
