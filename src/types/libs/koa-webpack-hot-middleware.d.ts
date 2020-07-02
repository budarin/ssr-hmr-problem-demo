import webpack from 'webpack';
import WebpackHotMiddleware from 'webpack-hot-middleware';

declare module 'koa-webpack-hot-middleware' {
    export function middleware(compiler: webpack.ICompiler, options?: WebpackHotMiddleware.MiddlewareOptions): any;
}
