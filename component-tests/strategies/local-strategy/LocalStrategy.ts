import { TestStrategy } from "../TestStrategyType";
import { initiateApp } from "../../../src/Server";

export const getLocalStrategy = async (): Promise<TestStrategy> => {
    const getRandomPort = ():number => Math.ceil(Math.random()* (60000 - 10000) + 10000);
    const environmentVariables : NodeJS.ProcessEnv = {
        ...process.env,
        SERVER_PORT:`${getRandomPort()}`
    };

    const {app, server} = await initiateApp(environmentVariables);

    const getEndpoint = (): string | Express.Application => app;
    const beforeAll = async (): Promise<void> => {}
    const beforeEach = async (): Promise<void> => {}
    const afterAll = async (): Promise<void> => {}
    const teardown = async (): Promise<void> => {
        server.close();
    }

    return {
        getEndpoint,
        beforeAll,
        beforeEach,
        afterAll,
        teardown
    }
}