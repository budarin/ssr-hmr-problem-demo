import Koa from 'koa';

import { IAppState, IAppContext } from '../types/koa';

import initApp from './utils/appHelpers/initApp';
import koaLogger from './middlewares/koaLogger';
import runServer from './utils/appHelpers/runServer';
import webApp from './middlewares/webApp';
import hmr from './hmr/index';

export const app = new Koa<IAppState, IAppContext>();

const isTest = process.env.NODE_ENV === 'test';

initApp(app).use(koaLogger);

if (!__PROD__) {
    hmr(app);
}

app.use(webApp);

// do not run in tests
!isTest && runServer(app);
