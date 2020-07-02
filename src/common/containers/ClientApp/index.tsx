import React from 'react';
import ErrorBoundary from '../../components/ErrorBoundary';

import App from '../../components/App';

const ClientApp = (): React.ReactElement => (
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
);

export default ClientApp;
