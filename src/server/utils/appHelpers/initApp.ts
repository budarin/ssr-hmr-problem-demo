import Application from 'koa';
import KeyGrip from 'keygrip';

import { IAppState, IAppContext } from '../../../types/koa';

import logger from '../../services/logger';
import getDataFromSecret from '../getDataFromSecret';
import getEnvironments from './getEnvironments';

const getGrepKeys = (): string[] => {
    const { KEYGRIP_KEYS = '', KEYGRIP_KEYS_FILE = '' } = process.env;
    // eslint-disable-next-line
    const keyGripString = getDataFromSecret(KEYGRIP_KEYS_FILE) || KEYGRIP_KEYS;

    if (!keyGripString) {
        logger.fatal('Missing KeyGrip', KEYGRIP_KEYS, KEYGRIP_KEYS_FILE);
        logger.flush();

        // eslint-disable-next-line no-process-exit
        process.exit(1);
    }

    try {
        return JSON.parse(keyGripString) as string[];
    } catch (error) {
        logger.fatal({ msg: 'Error parsing KeyGrip', error: error as Error });
        logger.flush();

        // eslint-disable-next-line no-process-exit
        process.exit(1);
    }
};

const env = getEnvironments();
const keyGripKeys = new KeyGrip(getGrepKeys(), 'sha256');

const initApp = (app: Application<IAppState, IAppContext>): Application<IAppState, IAppContext> => {
    logger.info({ environments: env });

    app.proxy = true;
    app.keys = keyGripKeys;

    return app;
};

export default initApp;
