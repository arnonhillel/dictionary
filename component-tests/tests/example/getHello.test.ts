import supertest from "supertest";
import getTestStrategy ,{ asyncCatcher } from "../../strategies/TestStrategyProvider";
import { TestStrategy } from "../../strategies/TestStrategyType";

const testStrategy: Promise<TestStrategy> = getTestStrategy();

describe('hello API', async () =>{
    describe('Get hello', () => {
        it(
            'should return a welcoming message',
            asyncCatcher(async ()=>{
                const endpoint: Express.Application = (await testStrategy).getEndpoint();
                const result = await supertest(endpoint).get('/hello');
                
                expect(result.status).toEqual(200);
                expect(result.text).toEqual('world');
            })
        )
    })
})