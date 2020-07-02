import { TAppMiddleware } from '../../types/koa';

// eslint-disable-next-line complexity
const healthCheck: TAppMiddleware = async (ctx, next) => {
    ctx.log.trace('healthCheck');

    // метод используется доккером для определения жив ли контейнер
    if (ctx.method === 'HEAD') {
        ctx.body = '';

        ctx.log.trace('Response for a HEAD request');

        return;
    }

    ctx.log.trace('------------NEW REQEST------------');
    ctx.log.trace({ msg: 'request path', path: ctx.path });

    await next();
};

export default healthCheck;
