import { TAppMiddleware } from '../../types/koa';

import isHexadecimal from 'validator/lib/isHexadecimal';
import throwClientError from '../utils/throwClientError';
import genRandomKey from '../utils/genRandomKey';

export const SID_REQUIRED_absent = { message: 'Security error: sid cookie is absent' };
export const SID_REQUIRED_ERROR = { message: 'Security error: sid cookie is absent' };

const checkSessionCookie: TAppMiddleware = async (ctx, next) => {
    ctx.log.trace('checkSessionCookie');

    const sid = ctx.cookies.get('sid', { signed: true });

    if (!sid) {
        // throwClientError(ctx, SID_REQUIRED_absent);

        ctx.cookies.set('sid', genRandomKey(), {
            signed: true,
            // secure: true,
            sameSite: 'strict',
            expires: new Date('2038-01-19 04:14:07'),
        });
    } else {
        if (!isHexadecimal(sid) || sid.length !== 32) {
            throwClientError(ctx, SID_REQUIRED_ERROR);

            return;
        }
    }

    await next();
};

export default checkSessionCookie;
