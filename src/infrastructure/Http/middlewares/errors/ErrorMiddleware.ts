import { Response, Request, NextFunction } from 'express';
import { isError, isFunction } from 'lodash';
import { Logger } from 'log4js';
import { ExpressErrorMiddlewareInterface, Middleware, HttpError } from 'routing-controllers';
import * as ErrorStackParser from 'error-stack-parser';
import { HttpLog } from '@infrastructure/Log';
import { lazyInject } from '@core';

import HttpStatusMessageMapper from './HttpStatusMessageMapper';
import { IErrorBody, ITransformableError, IParsedErrorDetails } from './interfaces';

@Middleware({ type: 'after', priority: 0 })
export default class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
    @lazyInject(HttpLog)
    private logger: Logger;

    public error(error: any, _: Request, response: Response, next: NextFunction) {
        this.logger.error(error);

        let result: IErrorBody<any>;

        if (error instanceof HttpError) {
            result = this.parseHttpError(error);
        } else if (this.isTransformable(error)) {
            result = this.parseTransformableError(error);
        } else if (error instanceof Error) {
            result = this.parseJSError(error);
        } else {
            result = this.parseMisc(error);
        }

        response.status(result.statusCode);
        response.contentType('application/json');
        response.json(result);
        next();
    }

    private isTransformable(error: any): error is ITransformableError<any> {
        return isError(error) && isFunction(error['getBody'])
    }

    private parseHttpError(error: HttpError): IErrorBody<any> {
        return {
            statusCode: error.httpCode,
            statusMessage: HttpStatusMessageMapper.getInstance().map(error.httpCode),
            message: error.message,
        };
    }

    private parseTransformableError(error: ITransformableError<any>): IErrorBody<any> {
        const body = error.getBody();
        const statusMessage = HttpStatusMessageMapper.getInstance().map(body.statusCode)
        return {
            ...body,
            statusMessage,
        };
    }

    private parseJSError(error: Error): IErrorBody<IParsedErrorDetails> {
        const details: IParsedErrorDetails = {
            name: error.name || 'Error',
            stack: ErrorStackParser.parse(error).map(frame => frame.toString())
        };
        return {
            details,
            statusCode: 500,
            statusMessage: HttpStatusMessageMapper.getInstance().map(500),
            message: error.message || '<no message>',
        }
    }

    private parseMisc(error: any): IErrorBody<any> {
        return {
            statusCode: 500,
            statusMessage: HttpStatusMessageMapper.getInstance().map(500),
            message: 'Unknown error',
            details: error
        };
    }
}
