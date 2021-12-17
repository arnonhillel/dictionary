import to from 'await-to-js';
import mongoose from 'mongoose';
import { Configuration } from '../configuration/Configuration';

export const connectDB = (configuration: Configuration): Promise<typeof mongoose> =>
    new Promise(async (resolve, reject) => {
        const [errorDbConnection, responseDbConnection] = await to(
            mongoose.connect(configuration.mongodbUrl, {
                ssl: true,
                auth: { username: configuration.mongodbUser, password: configuration.mongodbPassword },
                retryWrites: true,
                w: 'majority'
            })
        );
        if (errorDbConnection) {
            console.error({ message: 'Error while connect to DB' });
            reject(errorDbConnection);
        }
        if (responseDbConnection) {
            console.log({ message: 'Success connect to DB' });
            resolve(responseDbConnection);
        }
    });
