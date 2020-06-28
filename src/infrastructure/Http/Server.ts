import { inject, injectable } from 'inversify';
import { Express } from 'express';
import { Logger } from 'log4js';
import { createExpressServer } from 'routing-controllers';

import { ServerConfig, IServerConfig } from '@infrastructure/Config';
import { DefaultLog } from '@infrastructure/Log';
import { Controllers } from '@domain/Controllers';

import middlewares, { NotFoundMiddleware } from './middlewares';
import { IServer } from './meta';

@injectable()
export default class Server implements IServer {
    private app: Express | null = null;

    @inject(ServerConfig)
    private config: IServerConfig;

    @inject(DefaultLog)
    private logger: Logger;

    @inject(Controllers)
    private controllers: Function[];

    public start() {
        this.app = createExpressServer({
            middlewares,
            controllers: this.controllers,
            defaultErrorHandler: false,
        });
        this.app.use(NotFoundMiddleware); // Common 404 handler always must be the last

        this.app.listen(this.config.port, this.config.host, () => {
            this.logger.info(`Server started at ${this.config.host}:${this.config.port}`);
        });
    }
}
