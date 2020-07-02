import { stdSerializers } from 'pino';
import { TAppMiddleware } from '../../types/koa';
import logger from '../services/logger';

const UNDER_CONSTRUCTION = 503;

const koaLogger: TAppMiddleware = async (ctx, next) => {
    logger.trace('koaLogger');

    if (ctx.isShuttingDown === true) {
        ctx.status = UNDER_CONSTRUCTION;
        ctx.body = 'Service is shutting down...';

        const req = stdSerializers.req(ctx.req);
        logger.info({ msg: 'Send shutting down', req });

        return;
    }

    ctx.log = logger;

    try {
        await next();
    } catch (err) {
        const error = stdSerializers.err(err as Error);
        const req = stdSerializers.req(ctx.req);
        const res = stdSerializers.res(ctx.res);
        const body = String(ctx.body);

        ctx.log.error({ msg: 'Request Error', error, req, res, body });
    }
};

export default koaLogger;
