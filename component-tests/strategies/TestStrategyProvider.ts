import { getLocalStrategy } from "./local-strategy/LocalStrategy";
import { TestStrategy } from "./TestStrategyType";

const getCurrentTestStrategy = async (): Promise<TestStrategy> =>{
    const localRunner = await getLocalStrategy();

    beforeAll(localRunner.beforeAll);
    beforeEach(localRunner.beforeEach);
    afterAll(localRunner.afterAll);

    return localRunner;
}

export const asyncCatcher = (testCallback: () => Promise<void>) => async (done: jest.DoneCallback) => {
    try {
        await testCallback();
        done();
    } catch (err) {
        done.fail(err);
    }
};

export default getCurrentTestStrategy;