import Application from 'koa';

import { IAppState, IAppContext } from '../../../types/koa';

const initApp = (app: Application<IAppState, IAppContext>): Application<IAppState, IAppContext> => {
    app.proxy = true;

    return app;
};

export default initApp;
