import { Request, Response, NextFunction } from 'express';

import HttpStatusMessageMapper from './HttpStatusMessageMapper';
import { IErrorBody } from './interfaces';

export default (request: Request, response: Response, next: NextFunction): void => {
    if (!response.headersSent) {
        let body: IErrorBody = {
            statusCode: 404,
            statusMessage: HttpStatusMessageMapper.getInstance().map(404),
            message: `Cannot ${request.method} ${request.path}`
        };
        response.status(body.statusCode).json(body);
    } else {
        next();
    }
};
