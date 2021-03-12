import { CART } from "../constants";
const initialState = {
  products: [],
  productDetails: {},
};

export default function cart(state = initialState, action) {
  const { products, productDetails } = action;
  switch (action.type) {
    case CART.handlers.add:
      return {
        ...state,
        handling: true,
      };
    case CART.update:
      return {
        ...state,
        products,
        productDetails,
        handling: false,
      };
    default:
      return state;
  }
}
