import { Middleware } from 'koa';
import protect from 'overload-protection';
import overloadProtectConfig from './overloadProtectConfig';

const overloadProtect: Middleware = protect('koa', overloadProtectConfig);

export default overloadProtect;
