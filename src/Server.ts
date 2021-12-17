//@ts-ignore
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; //allow us to make HTTPS requests without caring about the other side

import dotenv from 'dotenv';
import express from 'express';
import { Server } from 'http';
import getWordsRouter from 'routers/WordsRouter';
import { Configuration, getConfiguration } from './configuration/Configuration';
import { initLogger } from './configuration/logging/Logger';
import { getCorsMiddleware } from './middleware/CorsMiddleware';
import { getLogMiddleware } from './middleware/LogMiddleware';
import getHealthRouter from './routers/HealthRouter';

const applyMiddlewareAndRouters = (app: express.Application, configuration: Configuration) => {
    app.use(express.json());
    app.use(getCorsMiddleware(configuration));
    app.use(getLogMiddleware());

    app.use('/words', getWordsRouter());

    app.use('/health', getHealthRouter());


};

const writeServerInfo = (serverPort: string) => {
    console.log(`Server is running on port ${serverPort}`)
};

export interface Application {
    app: express.Application;
    server: Server;
};

export const initiateApp = async (env?: NodeJS.ProcessEnv): Promise<Application> => {
    dotenv.config(); //enable reading environment variables from .env file
    const app: express.Application = express();
    const configuration: Configuration = getConfiguration(env);

    initLogger(configuration.logLevel, configuration.currentEnv);

    applyMiddlewareAndRouters(app, configuration);
    global.configuration = configuration;
    console.log({ message: 'Application will run with this configuration', configuration });

    const server = app.listen(configuration.serverPort, () => {
        writeServerInfo(configuration.serverPort);
    });

    return { app, server }
}
