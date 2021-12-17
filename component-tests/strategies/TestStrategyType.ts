export interface TestStrategy {
    getEndpoint: () => string | Express.Application;
    beforeAll: () => Promise<void>;
    beforeEach: () => Promise<void>;
    afterAll: () => Promise<void>;
    teardown: () => Promise<void>;
}