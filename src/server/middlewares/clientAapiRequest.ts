import { stdSerializers } from 'pino';
import proxy from 'koa-proxy';

import { TAppMiddleware } from '../../types/koa';

import logger from '../services/logger';
import getEnvironments from '../utils/appHelpers/getEnvironments';

//  Performs clients API requests

const { API_HOST, API_PORT } = getEnvironments();
const host = `http://${API_HOST}:${API_PORT}`;

const api: TAppMiddleware = async (ctx, next) => {
    logger.trace('api');

    if (ctx.path.startsWith('/api')) {
        await proxy({
            host,
            map: (path) => path.replace('/api', '/').replace('//', '/'),
        })(ctx, next);

        ctx.log.info({
            msg: 'API call',
            req: stdSerializers.req(ctx.req),
            res: stdSerializers.res(ctx.res),
            body: String(ctx.body),
        });
    } else {
        await next();
    }
};

export default api;
