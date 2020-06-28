import { Logger, connectLogger } from 'log4js';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { lazyInject } from '@core';
import { HttpLog } from '@infrastructure/Log';

type Handler = (request: Request, response: Response, next: NextFunction) => void;

const FORMAT = (
    ':remote-addr - - ":method :url HTTP/:http-version" :status :content-length ' +
    '":referrer" ":user-agent" :response-time'
);

@Middleware({ type: 'after' })
export default class LogMiddleware implements ExpressMiddlewareInterface {
    @lazyInject(HttpLog)
    private logger: Logger;

    private useInternal: Handler | null = null

    public use(request: Request, response: Response, next: NextFunction) {
        if (this.useInternal == null) {
            this.useInternal = connectLogger(this.logger, {
                format: FORMAT
            });
        }
        this.useInternal(request, response, next);
    }
}
