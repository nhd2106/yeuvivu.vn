import { PRODUCT } from "../constants";
const initialState = {
  products: [],
  productDetails: {},
  numberOfProducts: 0
};

export default function product(state = initialState, action) {
  const { products, productDetails, numberOfProducts } = action;
  switch (action.type) {
    case PRODUCT.handlers.get:
      return {
        ...state,
        handling: true,
      };
    case PRODUCT.update:
      return {
        ...state,
        products,
        productDetails,
        handling: false,
        numberOfProducts
      };
    default:
      return state;
  }
}
