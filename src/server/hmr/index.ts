/* eslint-disable node/no-unpublished-import */
/* eslint-disable node/no-unpublished-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import Koa from 'koa';
import webpack from 'webpack';

import { IAppState, IAppContext } from '../../types/koa';

import logger from '../services/logger';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
const webpackHotMiddleware = require('koa-webpack-hot-middleware-async').default;

import config from '../../../config/webpack/client/dev.webpack.config.js';
const compiler = webpack(config as webpack.Configuration);

const hmr = (app: Koa<IAppState, IAppContext>): void => {
    app.use(
        webpackDevMiddleware(compiler, {
            noInfo: false,
            overlay: true,
            autoConnect: true,
            hot: true,
            serverSideRender: true,
            publicPath: config.output.publicPath,
            headers: { 'Access-Control-Allow-Origin': '*' },
            watchOptions: {
                aggregateTimeout: 300,
                poll: true,
            },
        }),
    );

    app.use(
        webpackHotMiddleware(compiler, {
            log: logger.debug,
            reload: true,
        }),
    );
};

export default hmr;
