import { DataSource } from 'apollo-datasource';
import productList from './products';
import { Product } from '@/graphql/types';

let products = [];

export const clearProducts = () => {
  products = [];
};

export const seedProducts = (count = 100) => {
  // start clean
  clearProducts();

  // copy from seed products
  for (let i = 0; i < count; i++) {
    products.push({
      ...productList[i],
    });
  }
  return products;
};

export class ProductDataSource implements DataSource {
  initialize(config) {
    // is called by the graphql server during request init
    // get context & cache from config
  }

  getById(id: number): Product {
    return products.find((product) => product.id === id);
  }

  getAll(): Product[] {
    return products;
  }

  deleteProduct(product: Product): Product[] {
    products = products.filter((item) => product.id !== item.id);
    return products;
  }

  addProduct(product: Product): Product {
    if (!product.price) {
      product.price = product.basePrice;
    }
    if (!product.stocked) {
      product.stocked = false;
    }
    products.push(product);
    return product;
  }
}
