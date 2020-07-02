// eslint-disable-next-line node/no-unpublished-import
import { hot } from 'react-hot-loader/root';
import React from 'react';

import css from './index.css';

const App = (): React.ReactElement => <h1 className={css.app}>Hello world!</h1>;

export default hot(App);
