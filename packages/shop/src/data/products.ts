import sampleProducts from './sampleProducts';

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
      ...sampleProducts[i],
    });
  }
  return products;
};

export const getAllProducts = () => {
  return products;
};

export const getProduct = (id) => {
  return products.find((product) => product.id === id);
};

export const deleteProduct = (product) => {
  products = products.filter((item) => product.id !== item.id);
  return products;
};

export const addProduct = (product) => {
  if (!product.price) {
    product.price = product.basePrice;
  }
  if (!product.stocked) {
    product.stocked = false;
  }
  products.push(product);
  return product;
};

export const addProducts = (products) => {
  products.forEach((product) => {
    this.addProduct(product);
  });
};
