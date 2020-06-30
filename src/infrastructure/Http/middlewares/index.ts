import { json } from 'body-parser';

import { ErrorMiddleware, IErrorBody, IGetBodyResult, ITransformableError, NotFoundMiddleware } from './errors';
import LogMiddleware from './LogMiddleware';

export default <Function[]>[
    json(),
    LogMiddleware,
    ErrorMiddleware,
];
export { IErrorBody, ITransformableError, IGetBodyResult, NotFoundMiddleware };
