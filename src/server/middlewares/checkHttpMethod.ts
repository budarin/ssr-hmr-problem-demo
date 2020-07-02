import { TAppMiddleware } from '../../types/koa';
import throwClientError from '../utils/throwClientError';

const wrongHttpMethodError = (method: string): string => `Validation error: wrong http method ${method}`;

// eslint-disable-next-line complexity
const checkHttpMethod: TAppMiddleware = async (ctx, next) => {
    ctx.log.trace('checkHttpMethod');

    if (!['GET', 'POST'].includes(ctx.method)) {
        const error = { message: wrongHttpMethodError(ctx.method) };

        throwClientError(ctx, error);

        return;
    }

    await next();
};

export default checkHttpMethod;
