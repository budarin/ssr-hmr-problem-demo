import http from 'http';
import { stdSerializers } from 'pino';

import { IAppContext, IncomingError } from '../../types/koa';

const stdError = http.STATUS_CODES['500'];
function throwClientError(ctx: IAppContext, error: IncomingError): void {
    // eslint-disable-next-line
    const msg = !__PROD__ ? error.message : stdError;

    ctx.body = {
        error: {
            code: 500,
            message: msg,
        },
    };

    const err = stdSerializers.err({ name: '', ...error });
    const req = stdSerializers.req(ctx.req);
    const res = stdSerializers.res(ctx.res);
    const body = ctx.body;

    ctx.log.error({ msg: 'Throwing client error', error: err, req, res, body });
}

export default throwClientError;
