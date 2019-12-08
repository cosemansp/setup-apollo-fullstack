import mongoose, { Document, Model } from 'mongoose';
import { DataSource } from 'apollo-datasource';
import { InMemoryLRUCache } from 'apollo-server-caching';
import DataLoader from 'dataloader';

const remapDocs = (docs: any[], ids: any[]) => {
  const idMap = {};
  docs.forEach((doc) => {
    idMap[doc._id] = doc;
    idMap[doc._id].id = doc._id;
  });
  return ids.map((id) => idMap[id]);
};

type ID = number | string | mongoose.Types.ObjectId;

export class MongooseDataSource<
  TModel extends Model<Document>,
  TDoc extends Document,
  TContext extends {} = {}
> implements DataSource<TContext> {
  protected context: TContext;
  protected cache: InMemoryLRUCache;
  protected loader: DataLoader<ID, TDoc>;

  constructor(protected model: TModel) {
    this.loader = new DataLoader((ids: ID[]) => {
      return model
        .find({ _id: { $in: ids } })
        .lean()
        .then((docs) => remapDocs(docs, ids));
    });
  }

  initialize(config) {
    this.context = config.context;
    this.cache = config.cache || new InMemoryLRUCache();
  }

  loadOne(id: ID): Promise<TDoc> {
    return this.loader.load(id);
  }

  loadMany(ids: ID[]): Promise<TDoc[]> {
    return Promise.all(ids.map((id) => this.loadOne(id)));
  }

  async loadManyByQuery(query: any): Promise<TDoc[]> {
    const docs: any = await this.model.find(query).lean();
    return docs.map((doc) => ({
      ...doc,
      id: doc._id,
    }));
  }
}
