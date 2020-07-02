import Redis from 'ioredis';

import logger from '../logger';
import getEnvironments from '../../utils/appHelpers/getEnvironments';

const { REDIS_HOST, REDIS_PORT = '6379' } = getEnvironments();
const connectionURL = `redis://${REDIS_HOST}:${REDIS_PORT}`;

const redis = new Redis(connectionURL);

redis.on('connect', () => logger.debug({ msg: 'Redis Client is connected' }));
redis.on('error', (error: Error) => logger.error({ msg: 'Redis Client error', error }));
redis.on('reconnecting', (ms: number) => logger.error({ msg: 'Redis Client is reconnecting', ms }));
redis.on('end', () => logger.debug({ msg: 'Redis Client is disconnected' }));

export default redis;
