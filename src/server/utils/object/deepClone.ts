/* eslint-disable */

type TTransformNameFunc = (name: string) => string;
const K = (x: string): string => x;

function deepClone(o: unknown, transformName: TTransformNameFunc = K): unknown {
    let newO;
    let i;

    if (typeof o !== 'object') return o;

    if (!o) return o;

    if (Object.prototype.toString.apply(o) === '[object Array]') {
        newO = [];
        //@ts-ignore
        for (i = 0; i < o.length; i += 1) {
            //@ts-ignore
            newO[i] = deepClone(o[i], transformName);
        }
        return newO;
    }

    newO = {};
    for (i in o) {
        if (o.hasOwnProperty(i)) {
            //@ts-ignore
            newO[transformName(i)] = deepClone(o[i], transformName);
        }
    }
    return newO;
}

export default deepClone;
