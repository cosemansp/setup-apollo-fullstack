import mongoose from 'mongoose';
import config, { isDev, isProduction } from './config';
import { logManager } from './logManager';

const log = logManager.getLogger('db');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const migrateDb = (connection: any): Promise<any> => {
  log.info('Database Migration:');
  //
  // add migration here
  //
  return Promise.resolve();
};

export async function open() {
  mongoose.Promise = global.Promise;

  // open db connection
  const options = {
    autoIndex: !isProduction(),
    useUnifiedTopology: true,
  };
  await mongoose.connect(config.MONGO_URI, options);

  // run migration
  if (isDev()) {
    await migrateDb(mongoose.connection);
  }
  log.info('Database Connected Success Full');
}

export function close() {
  mongoose.connection.close();
}
