import Koa from 'koa';

import { IAppState, IAppContext } from '../types/koa';

import initApp from './utils/appHelpers/initApp';
import koaLogger from './middlewares/koaLogger';
import responseTime from './middlewares/responseTime';
import runServer from './utils/appHelpers/runServer';
import healthCheck from './middlewares/healthCheck';
import overloadProtect from './middlewares/overloadProtect';
import checkSessionCookie from './middlewares/checkSessionCookie';
import checkHttpMethod from './middlewares/checkHttpMethod';
import postBodyParser from './middlewares/postBodyParser';
import webApp from './middlewares/webApp';
import clientAapiRequest from './middlewares/clientAapiRequest';
import prepareState from './middlewares/prepareState';
import hmr from './hmr/index';

export const app = new Koa<IAppState, IAppContext>();

const isTest = process.env.NODE_ENV === 'test';

initApp(app).use(koaLogger).use(healthCheck);

if (!__PROD__) {
    // eslint-disable-next-line
    // const serve = require('koa-static');
    // // eslint-disable-next-line
    // app.use(serve('./dist/client'));
    hmr(app);
}

app.use(responseTime)
    .use(overloadProtect)
    .use(checkSessionCookie)
    .use(checkHttpMethod)
    .use(clientAapiRequest)
    .use(postBodyParser)
    .use(prepareState)
    .use(webApp);

// do not run in tests
!isTest && runServer(app);
