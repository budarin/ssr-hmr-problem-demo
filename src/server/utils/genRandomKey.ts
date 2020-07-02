import crypto from 'crypto';

const genRandomKey = (): string => crypto.randomBytes(16).toString('hex');

export default genRandomKey;
