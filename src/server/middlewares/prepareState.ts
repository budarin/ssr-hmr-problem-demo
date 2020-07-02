import { TAppMiddleware } from '../../types/koa';

// Prepare data for a page by calling page's static method getData

const prepareState: TAppMiddleware = async (ctx, next) => {
    try {
        // Get data from API
        ctx.state.appState = {};

        await next();
    } catch (error) {
        // throw Error
    }
};

export default prepareState;
