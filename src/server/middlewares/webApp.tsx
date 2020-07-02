import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { TAppMiddleware } from '../../types/koa';

import ServerApp from '../../common/containers/ServerApp';

const webApp: TAppMiddleware = (ctx) => {
    ctx.log.trace('webApp');

    if (ctx.method === 'GET') {
        const appStr = ReactDOMServer.renderToStaticMarkup(<ServerApp />);

        ctx.type = 'text/html';
        ctx.body = `<!DOCTYPE html />
        <html>
            <meta charset="UTF-8">
            <title>title</title>
            <style>
                .App-index-app {
                    color: green;
                }
            </style>
            <body>
                <div id="root">${appStr}</div>
            </body>
            <script src="client.js" defer></script>
        </html>`;
    }
};

export default webApp;
