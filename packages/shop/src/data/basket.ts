// we can store multiple baskets
let baskets = [];

export const getOrCreateBasket = (checkoutID) => {
  let basket = baskets[checkoutID];
  if (!baskets[checkoutID]) {
    baskets[checkoutID] = [];
    basket = baskets[checkoutID];
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
  }
  return basket;
};

export const removeProductFromBaskets = (productId) => {
  for (let prop in baskets) {
    baskets[prop] = baskets[prop].filter((basket) => basket.productId !== productId);
  }
};

export const clearBasket = (checkoutID, refill = false) => {
  const previousBasket = getOrCreateBasket(checkoutID);
  baskets[checkoutID] = []; // clear basket
  if (refill) {
    baskets[checkoutID].push({
      id: 1,
      productId: 1,
      quantity: 1,
    });
    baskets[checkoutID].push({
      id: 2,
      productId: 2,
      quantity: 4,
    });
  }
  return previousBasket;
};
