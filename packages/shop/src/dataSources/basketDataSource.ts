import { DataSource } from 'apollo-datasource';
import { InMemoryLRUCache } from 'apollo-server-caching';
import { Basket } from '@/graphql/types';
import { Context } from '@/graphql/context';

// we can store multiple baskets
let baskets = [];

const seedBasket = (basket) => {
  basket.push({
    id: 1,
    productId: 1,
    quantity: 1,
  });
  basket.push({
    id: 2,
    productId: 2,
    quantity: 4,
  });
};

const mapToBasket = (checkoutID: string, rawList: any[]): Basket => {
  const items = rawList.map((item) => {
    return {
      ...item,
      product: {
        id: item.productId,
      },
    };
  });
  return {
    checkoutID,
    items,
  };
};

export class BasketDataSource implements DataSource {
  context: Context;
  cache: InMemoryLRUCache;

  initialize(config) {
    this.context = config.context;
    this.cache = config.cache;
  }

  getOrCreateBasket(checkoutID: string): Basket {
    let basket = baskets[checkoutID];
    if (!baskets[checkoutID]) {
      baskets[checkoutID] = [];
      basket = baskets[checkoutID];
      seedBasket(basket);
    }
    return mapToBasket(checkoutID, basket);
  }

  removeProductFromBaskets(productId: number): void {
    for (let prop in baskets) {
      baskets[prop] = baskets[prop].filter((basket) => basket.productId !== productId);
    }
  }

  clearBasket(checkoutID: string, refill = false): Basket {
    const previousBasket = this.getOrCreateBasket(checkoutID);
    baskets[checkoutID] = []; // clear basket
    if (refill) {
      seedBasket(baskets[checkoutID]);
    }
    return previousBasket;
  }
}
