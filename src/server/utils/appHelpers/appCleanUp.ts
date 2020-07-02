import redis from '../../services/redis';
import logger from '../../services/logger';

const appCleanUp = (): void => {
    logger.trace('appCleanUp');

    redis.disconnect();
};

export default appCleanUp;
