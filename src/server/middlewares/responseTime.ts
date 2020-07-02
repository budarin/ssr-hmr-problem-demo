import os from 'os';

import { TAppMiddleware } from '../../types/koa';
import getMsFromHrTime from '../utils/getMsFromHrTime';

const responseTime: TAppMiddleware = async (ctx, next) => {
    const start = process.hrtime();
    await next();
    const ms = getMsFromHrTime(process.hrtime(start));

    const metrics = {
        'x-api-redis-time': `${ctx.state.redisTime || -1}`,
        'x-api-response-time': `${ms}`,
    };

    ctx.set('x-api-host', `${os.hostname()}`);
    ctx.set(metrics);

    // eslint-disable-next-line
    ctx.log.info({ msg: 'request metrics', metrics });
};

export default responseTime;
