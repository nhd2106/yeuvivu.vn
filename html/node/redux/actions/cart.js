import { put, takeLatest, all, call } from "redux-saga/effects";

import { CART, PRODUCT } from "../constants";
import { fetchStrapi } from "../../utils/callStrapi";

function* addToCart({ id }) {
    const cart = useSelector(({ cart }) => {
        cart
    })
    if(cart[`${id}`]) {
        
    }
  try {
    yield put({
      type: CART.update,
      products,
    });
  } catch (error) {
    console.log(error);
  }
}

function* fetchProductDetails({ id }) {
  try {
    const { data: productDetails } = yield call(fetchStrapi, `products/${id}`);
    yield put({
      type: PRODUCT.update,
      productDetails,
    });
  } catch (error) {
    console.log(error);
  }
}

export const addToCartHandler = ({ id }) => ({
  type: CART.handlers.add,
  id,
});
export const handlerGetProductDetails = (id) => ({
  type: PRODUCT.handlers.getDetails,
  id,
});

export default function* saga() {
  yield all([
    yield takeLatest(CART.handlers.add, addToCart),
    yield takeLatest(PRODUCT.handlers.getDetails, fetchProductDetails),
  ]);
}
