import Koa from 'koa';
import mock from 'node-mocks-http';

import { IAppState, IAppContext } from '../../src/types/koa';
import logger from '../../src/server/services/logger';

export interface MockContext<RequestBody = undefined> extends IAppContext {
    request: IAppContext['request'] & {
        body?: RequestBody;
    };
}

const NOT_FOUND = 404;

const koaMockContext = <State = IAppState, Context = MockContext, ResponseBody = undefined>(
    responseBody?: ResponseBody,
): Koa.ParameterizedContext<IAppState, IAppContext> => {
    const req = mock.createRequest();
    const res = mock.createResponse();
    const app = new Koa<State, Context>();
    const context = app.createContext(req, res) as IAppContext;

    // @ts-ignore
    context.log = logger;

    res.statusCode = NOT_FOUND;
    context.response.body = responseBody;
    return context;
};

export default koaMockContext;
