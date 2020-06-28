import { Response, Request, NextFunction } from 'express';
import { isError, isFunction } from 'lodash';
import { ExpressErrorMiddlewareInterface, Middleware, HttpError } from 'routing-controllers';

import HttpStatusMessageMapper from './HttpStatusMessageMapper';
import { IErrorBody, ITransformableError } from './interfaces';

@Middleware({ type: 'after', priority: 0 })
export default class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
    public error(error: any, _: Request, response: Response, next: NextFunction) {
        const mapper = HttpStatusMessageMapper.getInstance();
        let result: IErrorBody<any>;

        if (error instanceof HttpError) {
            result = {
                statusCode: error.httpCode,
                statusMessage: mapper.map(error.httpCode),
                message: error.message,
            };
        } else if (this.isTransformable(error)) {
            const body = error.getBody();
            const statusMessage = mapper.map(body.statusCode)
            result = {
                ...body,
                statusMessage,
            };
        } else {
            result = {
                statusCode: 500,
                statusMessage: mapper.map(500),
                message: 'Unknown error',
                details: error
            };
        }

        response.status(result.statusCode);
        response.contentType('application/json');
        response.json(result);
        next();
    }

    private isTransformable(error: any): error is ITransformableError<any> {
        return isError(error) && isFunction(error['getBody'])
    }
}
