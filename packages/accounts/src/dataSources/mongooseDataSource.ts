import mongoose, { Document, Model } from 'mongoose';
import { keyBy, get } from 'lodash';
import { DataSource } from 'apollo-datasource';
import { InMemoryLRUCache } from 'apollo-server-caching';
import DataLoader from 'dataloader';
import sift from 'sift';

// Base on:
// https://github.com/JamesLefrere/apollo-datasource-mongodb

type ID = number | string | mongoose.Types.ObjectId;
type Options = {
  ttl?: number;
};

export class MongooseDataSource<
  TModel extends Model<Document>,
  TDoc extends Document,
  TContext extends {} = {}
> implements DataSource<TContext> {
  protected context: TContext;
  protected cache: InMemoryLRUCache<TDoc>;
  protected loader: DataLoader<ID, TDoc>;
  protected queryLoader: DataLoader<any, TDoc[]>;
  protected readonly cachePrefix: string;

  constructor(protected model: TModel) {
    this.loader = new DataLoader((ids: ID[]) => {
      return model
        .find({ _id: { $in: ids } })
        .lean()
        .then((docs) => {
          const listByKey = keyBy(docs, '_id');
          return ids.map((id) => get(listByKey, id, null));
        });
    });

    this.queryLoader = new DataLoader((queries) => {
      return model
        .find({ $or: queries })
        .lean()
        .then((items) => {
          return queries.map((query) => items.filter(sift(query)));
        });
    });

    this.cachePrefix = `mongo-${model.collection.collectionName}`;
  }

  initialize(config) {
    this.context = config.context;
    this.cache = config.cache; // || new InMemoryLRUCache<TDoc>();
  }

  private async storeInCache(doc: any, key: string, ttl?: number) {
    if (!Number.isInteger(ttl)) return null;
    if (this.cache) {
      return this.cache.set(key, doc, { ttl });
    }
    return Promise.resolve();
  }

  private getKey(id) {
    return `${this.cachePrefix}-${id}`;
  }

  async load(id: ID, options: Options = {}): Promise<TDoc> {
    let doc;
    const key = this.getKey(id);
    if (this.cache) {
      // try to get it from the cache
      doc = await this.cache.get(key);
    }
    if (!doc) {
      // load from db (using loader to batch requests)
      doc = await this.loader.load(id);
      await this.storeInCache(doc, key, options.ttl);
    }
    return doc;
  }

  async loadMany(ids: ID[], options: Options = {}): Promise<TDoc[]> {
    const docs = await Promise.all(
      ids.map(async (id) => {
        let doc;
        const key = this.getKey(id);
        if (this.cache) {
          // try to load from cache
          doc = await this.cache.get(key);
        }
        if (!doc) {
          // load from db
          doc = await this.loader.load(id);
          await this.storeInCache(doc, key, options.ttl);
        }
        return doc;
      }),
    );
    return docs;
  }

  public async deleteFromCacheById(id: ID) {
    const serializedId = id && typeof id === 'object' ? JSON.stringify(id) : id;
    const key = this.getKey(serializedId);
    await this.cache.delete(key);
    this.loader.clear(id);
  }

  async loadByQuery(query: any, options: Options = {}): Promise<TDoc> {
    const key = this.getKey(JSON.stringify(query));

    // try to get from cache
    if (this.cache) {
      const cacheDocs: any = await this.cache.get(key);
      if (cacheDocs) return cacheDocs as TDoc;
    }

    // load query (BATCHING NOT POSSIBLE HERE)
    const doc = await this.model.findOne(query).lean();

    // store in cache
    if (doc) {
      await Promise.all([
        this.storeInCache(doc, key, options.ttl),
        this.storeInCache(doc, this.getKey(doc.id), options.ttl),
      ]);
    }
    return doc;
  }

  async loadManyByQuery(query: any, options: Options = {}): Promise<TDoc[]> {
    const queryKey = this.getKey(JSON.stringify(query));

    // try to get from cache
    if (this.cache) {
      const cacheDocs: any = await this.cache.get(queryKey);
      if (cacheDocs) return cacheDocs as TDoc[];
    }

    // load query in batch
    const docs = await this.queryLoader.load(query);

    // store in cache
    if (docs.length > 0 && this.cache) {
      const promises = docs.map((doc) => {
        const key = this.getKey(doc.id);
        return this.storeInCache(doc, key, options.ttl);
      });
      promises.push(this.storeInCache(docs, queryKey, options.ttl));
      await Promise.all(promises);
    }
    return docs;
  }
}
