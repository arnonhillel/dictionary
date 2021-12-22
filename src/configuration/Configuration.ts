
export enum CustomRequestHeaders {
    requestId = 'requestId',
    requestingActorId = 'requestingActorId',
    someHeader = 'someHeader'
}

export interface Configuration {
    serverPort: string;
    logLevel: string;
    currentEnv: string;
    clientEndpoint: string;
    mongodbUrl: string;
    mongodbUser: string;
    mongodbPassword: string;
    apiEndpoint: string;
}

export const getConfiguration = (env: NodeJS.ProcessEnv = process.env): Configuration => ({
    serverPort: env.SERVER_PORT || '5000',
    logLevel: env.LOG_LEVEL || 'debug',
    currentEnv: env.CURRENT_ENV || 'local',
    mongodbUrl: env.MONGO_DB_URL || 'http://localhost:27017',
    mongodbUser: env.MONGO_DB_USER || 'mongodbUser',
    mongodbPassword: env.MONGO_DB_PASSWORD || 'mongodbPassword',
    apiEndpoint: env.API_ENDPOINT || 'http://localhost:5000',
    clientEndpoint: env.CLIENT_ENDPOINT || 'http://localhost:3000',
});