import mongoose from 'mongoose';

export async function openDb(url: string = process.env.MONGO_URL) {
  mongoose.Promise = global.Promise;
  await mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
}

export async function clearCollection(collectionName: string) {
  await mongoose.connection.collection(collectionName).deleteMany({});
}

export async function clearDb() {
  await mongoose.connection.db.dropDatabase();
}

export async function closeDb() {
  await mongoose.connection.close();
}
