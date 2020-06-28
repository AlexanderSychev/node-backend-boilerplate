import { json } from 'body-parser';

import NotFoundMiddleware from './NotFoundMiddleware';
import LogMiddleware from './LogMiddleware';

export default <Function[]>[
    json(),
    NotFoundMiddleware,
    LogMiddleware,
];
