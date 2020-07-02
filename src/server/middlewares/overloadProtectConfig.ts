type TOverloadProtectConfig = {
    production: boolean;
    errorPropagationMode: boolean;
    clientRetrySecs: number;
    sampleInterval: number;
    maxEventLoopDelay: number;
    maxHeapUsedBytes: number;
    maxRssBytes: number;
    logging: boolean;
};

// https://github.com/davidmarkclements/overload-protection
const overloadProtectConfig: TOverloadProtectConfig = {
    production: __PROD__,
    clientRetrySecs: 1,
    sampleInterval: 5,
    maxEventLoopDelay: 42,
    maxHeapUsedBytes: 0,
    maxRssBytes: 0,
    errorPropagationMode: false,
    logging: false,
};

export default overloadProtectConfig;
