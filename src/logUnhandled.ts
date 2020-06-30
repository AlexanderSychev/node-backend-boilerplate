/**
 * @fileoverview bind listeners for unhandled rejections and uncaught exceptions
 */
import moment from 'moment';
import { inspect } from 'util';

const logError = (err: Error) => {
    console.error(
        moment().format('YYYY-MM-DD hh:mm:ss'),
        err
    );
};

process.on('unhandledRejection', (err: any) => {
    if (err instanceof Error) {
        logError(err);
    } else {
        logError(new Error(`Unhandled rejection: ${inspect(err)}`));
    }
});

process.on('uncaughtException', logError);
