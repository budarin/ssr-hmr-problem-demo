import koaBody from 'koa-body';

import { TAppMiddleware } from '../../types/koa';

const TEN = 10;
const KILOBYTES = 1024;
const TEN_KILOBYTES = TEN * KILOBYTES;

const body = koaBody({ jsonLimit: TEN_KILOBYTES });

const postBodyParser: TAppMiddleware = async (ctx, next) => {
    ctx.log.trace('postBodyParser');

    if (ctx.method === 'POST') {
        ctx.log.trace('parsing body');

        await body(ctx, next);
    } else {
        await next();
    }
};

export default postBodyParser;
