const BEAUTIFUL_INDENT = 2;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prettyfyJSON = (obj: IHash<any>): string | any => {
    if (!__PROD__) {
        return JSON.stringify(obj, null, BEAUTIFUL_INDENT);
    } else {
        return obj;
    }
};

export default prettyfyJSON;
