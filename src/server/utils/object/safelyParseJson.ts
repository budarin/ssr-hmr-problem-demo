import logger from '../../services/logger';

function safelyParseJson<T>(str: string): TErrorOrResultObject<Error, T> {
    try {
        return {
            result: JSON.parse(str) as T,
        };
    } catch (error) {
        const { message, stack } = error as Error;
        logger.error({ msg: 'safelyParseJson error:', str, message, stack });

        return {
            error: {
                code: 500,
                message,
            },
        };
    }
}

export default safelyParseJson;
