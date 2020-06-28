import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';

import NotFound from '../errors/NotFound';

@Middleware({ type: 'after' })
export default class NotFoundMiddleware implements ExpressMiddlewareInterface {
    public use(request: Request, _: Response, next: NextFunction) {
        if (!request.route) {
            return next(new NotFound('Route not found'));
        }
        return next();
    }
}
