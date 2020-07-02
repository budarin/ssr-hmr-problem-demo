import React from 'react';
import ReactDOM from 'react-dom';

import ClientApp from '../common/containers/ClientApp';

const renderMethod = __PROD__ ? ReactDOM.hydrate : ReactDOM.render;

const renderApp = () => {
    renderMethod(<ClientApp />, document.getElementById('root'));
};

document.addEventListener('DOMContentLoaded', renderApp);

if (!__PROD__) {
    if (module.hot) {
        module.hot.accept('../common/components/App', renderApp);
    }
}
