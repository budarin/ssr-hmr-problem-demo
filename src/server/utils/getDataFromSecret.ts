import fs from 'fs';

import logger from '../services/logger';

const getDataFromSecret = (secretEnvName: string): string => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    if (secretEnvName && fs.existsSync(secretEnvName)) {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        return fs.readFileSync(secretEnvName, 'utf8');
    }

    logger.error(`Secret file ${secretEnvName} is missing!`);

    return '';
};

export default getDataFromSecret;
