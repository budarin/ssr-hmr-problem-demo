import logger from '../../services/logger';

function asyncTryParseJson<T>(str: string, callback: (params: TErrorOrResultObject<Error, T>) => void): void {
    process.nextTick(() => {
        try {
            callback({
                result: JSON.parse(str) as T,
            });
        } catch ({ message, stack }) {
            callback({
                error: {
                    code: 500,
                    message: message as string,
                },
            });

            logger.error('asyncTryParseJson error:', str, message, stack);
        }
    });
}

export default asyncTryParseJson;
