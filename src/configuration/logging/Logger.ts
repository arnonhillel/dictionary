import httpContext from 'express-http-context';
import { Format, TransformableInfo } from 'logform';
import * as winston from 'winston';
import { CustomRequestHeaders } from "../Configuration";

const { createLogger, transports, format } = winston;
const { timestamp, json, combine, splat, colorize, simple, printf } = format;

const getRequestFormat = () =>
    format(
        (info: TransformableInfo): TransformableInfo => {
            if (!info.request) {
                const requestId = httpContext.get(CustomRequestHeaders.requestId);
                info.request = requestId && {
                    id: requestId
                };
            }
            if (!info.actorId) {
                const actorId = httpContext.get(CustomRequestHeaders.requestingActorId);
                info.actorId = actorId
            }
            return info;
        }
    );


const getFormats = (currentEnv: string): Format[] => {
    const requestFormat = getRequestFormat();

    let formats = [splat(), requestFormat(), timestamp(), json()];

    if (currentEnv === 'local') {
        formats = [
            ...formats,
            colorize(),
            simple(),
            printf(info => {
                const { level, timestamp, message, ...other } = info;
                let stringifiedMetadata = JSON.stringify(other, undefined, 4);
                stringifiedMetadata = stringifiedMetadata === '{}' ? '' : `\n${stringifiedMetadata}`;

                return `${info.timestamp} ${info.level} ${info.message} ${stringifiedMetadata} \n`;
            })
        ];
    }

    return formats;
}

export const initLogger = async (logLevel: string, currentEnv: string) => {
    const options = {
        console: {
            level: logLevel,
            handleExceptions: true
        }
    };

    const formats = getFormats(currentEnv);

    const logger = createLogger({
        transports: [new transports.Console(options.console)],
        exitOnError: false,
        format: combine(...formats)
    });

    console.log = (entry: winston.LogEntry | string) => {
        if (typeof entry === 'string') {
            logger.log({ level: 'debug', message: entry });
        } else {
            logger.log({ level: 'debug', ...entry });
        }
    };

    console.log = (entry: winston.LogEntry | string) => {
        if (typeof entry === 'string') {
            logger.log({ level: 'debug', message: entry });
        } else {
            logger.log({ level: 'info', ...entry });
        }
    };

    console.warn = (message, ...args) => logger.warn(message, ...args);
    console.error = (message, ...args) => logger.error({ message, level: 'error', ...args });
    console.debug = (message, ...args) => logger.debug(message, ...args);
}