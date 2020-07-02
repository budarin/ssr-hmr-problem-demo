/**
 *
 * @param fns list of functions
 *
 * sample: pipe(sort, capitalise)(['cde', 'abs']) => ['ABC', 'CDE']
 */
// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-unsafe-return
const pipe = (...fns: Array<Function>) => (x: unknown): unknown => fns.reduce((v, f) => f(v), x);

export default pipe;
