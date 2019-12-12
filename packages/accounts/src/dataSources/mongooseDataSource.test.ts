import { openDb, closeDb, clearDb } from '@test/dbHelper';
import { MongooseDataSource } from './mongooseDataSource';
import { UserModel, UserModelType, UserDoc } from '../domain/userModel';
import { InMemoryLRUCache } from 'apollo-server-caching';

export class UserTestDataSource extends MongooseDataSource<UserModelType, UserDoc> {
  constructor() {
    super(UserModel);
  }
}

describe('mongooseDataSource', () => {
  beforeAll(() => openDb());
  beforeEach(clearDb);
  afterEach(() => jest.restoreAllMocks());
  afterAll(closeDb);

  let joe;
  let jane;
  let bart;
  beforeEach(() => {
    joe = new UserModel({ name: 'joe', company: 'apple' });
    jane = new UserModel({ name: 'jane', company: 'apple' });
    bart = new UserModel({ name: 'bart', company: 'microsoft' });
    return Promise.all([joe.save(), jane.save(), bart.save()]);
  });

  test('load single', async () => {
    // arrange
    const sut = new UserTestDataSource();
    sut.initialize({});

    // act
    const result = await sut.load(joe.id);

    // assert
    expect(result.name).toBe(joe.name);
    expect(result.id).toEqual(joe._id.toHexString());
  });

  test('load single - with batching', async () => {
    // arrange
    const sut = new UserTestDataSource();
    const findSpy = jest.spyOn(UserModel, 'find');
    sut.initialize({});

    // act
    const result1 = await sut.load(joe.id);
    const result2 = await sut.load(joe.id);

    // assert
    expect(result1).toBe(result2);
    expect(findSpy).toBeCalledTimes(1);
  });

  test('load single - with cache', async () => {
    // arrange
    const cache = new InMemoryLRUCache();
    const ds1 = new UserTestDataSource();
    const ds2 = new UserTestDataSource();

    const findSpy = jest.spyOn(UserModel, 'find');
    ds1.initialize({ cache });
    ds2.initialize({ cache });

    // act
    const result1 = await ds1.load(joe.id, { ttl: 5 });
    const result2 = await ds2.load(joe.id, { ttl: 5 });

    // assert
    expect(result1).toBe(result2);
    expect(findSpy).toBeCalledTimes(1);
  });

  test('load multiple', async () => {
    // arrange
    const sut = new UserTestDataSource();
    sut.initialize({});

    // act
    const result = await sut.loadMany([joe.id, jane.id]);

    // assert
    expect(result).toBeArrayOfSize(2);
    expect(result[0].name).toBe(joe.name);
    expect(result[1].name).toBe(jane.name);
  });

  test('load multiple - with batching', async () => {
    // arrange
    const sut = new UserTestDataSource();
    const findSpy = jest.spyOn(UserModel, 'find');
    sut.initialize({});

    // act
    await sut.loadMany([joe.id, jane.id]);
    const result2 = await sut.loadMany([bart.id, joe.id, jane.id]);

    // assert
    expect(findSpy).toBeCalledTimes(2);
    expect(result2[0].name).toBe(bart.name);
    expect(result2[1].name).toBe(joe.name);
    expect(result2[2].name).toBe(jane.name);
  });

  test('load multiple - with caching', async () => {
    // arrange
    const cache = new InMemoryLRUCache();
    const ds1 = new UserTestDataSource();
    const ds2 = new UserTestDataSource();
    const findSpy = jest.spyOn(UserModel, 'find');
    ds1.initialize({ cache });
    ds2.initialize({ cache });

    // act
    await ds1.loadMany([joe.id, jane.id], { ttl: 5 });
    const result = await ds2.loadMany([joe.id, jane.id], { ttl: 5 });

    // assert
    expect(findSpy).toBeCalledTimes(1);
    expect(result[0].name).toBe(joe.name);
    expect(result[1].name).toBe(jane.name);
  });

  test('loadByQuery', async () => {
    // arrange
    const sut = new UserTestDataSource();
    sut.initialize({});

    // act
    const result = await sut.loadByQuery({ name: 'joe' });

    // assert
    expect(result.name).toBe(joe.name);
  });

  test('loadByQuery - with caching', async () => {
    // arrange
    const cache = new InMemoryLRUCache();
    const sut = new UserTestDataSource();
    const findSpy = jest.spyOn(UserModel, 'findOne');
    sut.initialize({ cache });

    // act
    const result1 = await sut.loadByQuery({ name: 'joe' }, { ttl: 5 });
    const result2 = await sut.loadByQuery({ name: 'joe' });

    // assert
    expect(findSpy).toBeCalledTimes(1);
    expect(result1.name).toBe(result2.name);
  });

  test('loadManyByQuery', async () => {
    // arrange
    const sut = new UserTestDataSource();
    sut.initialize({});

    // act
    const result = await sut.loadManyByQuery({ company: 'apple' });

    // assert
    expect(result).toBeArrayOfSize(2);
  });

  test('loadManyByQuery - with caching', async () => {
    // arrange
    const cache = new InMemoryLRUCache();
    const sut = new UserTestDataSource();
    const findSpy = jest.spyOn(UserModel, 'find');
    sut.initialize({ cache });

    // act
    const result1 = await sut.loadManyByQuery({ company: 'apple' }, { ttl: 5 });
    const result2 = await sut.loadManyByQuery({ company: 'apple' });

    // assert
    expect(findSpy).toBeCalledTimes(1);
    expect(result1).toEqual(result2);
  });
});
