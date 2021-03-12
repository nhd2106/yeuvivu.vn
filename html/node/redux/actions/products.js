import { put, takeLatest, all, call, takeEvery } from "redux-saga/effects";
import {
  forEach,
  set
} from 'lodash';

import { PRODUCT } from "../constants";
import { fetchStrapi } from "../../utils/callStrapi";
import { graphQLCaller } from "../../libs/backend";

function* fetchProducts() {
  try {
    const { data: products } = yield call(fetchStrapi, "products");
    yield put({
      type: PRODUCT.update,
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
function* getNumberOfProducts() {
  try {
    const { data: numberOfProducts } = yield call(fetchStrapi, `products/count`);
    yield put({
      type: PRODUCT.update,
      numberOfProducts,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* queryProducts() {
  try {
    const { products } = yield graphQLCaller(`query {
      products {
        title,
        slug,
        price,
        og_image  {
          url
        },
        promotion
      }
    }`);
    yield put({
      type: PRODUCT.update,
      products,
    });
  } catch (error) {
    console.log(error);
  }
}
export function* queryProductsByPage(props) {
  const { page, type, ...rest } = props;
  const where = {};
  console.log(rest)
  forEach(rest, (value, key) => {
    if(value) {
      set(where, `where.${key}`, value)
    }
  })
  console.log(JSON.stringify(where))
  const query = `query {
    products(limit: 2, start:${page*2 - 2}, 
    }) {
      title,
      slug,
      price,
      og_image  {
        url
      },
      promotion
    }
  }`
  try {
    const { data: numberOfProducts } = yield call(fetchStrapi, `products/count`);
    const { products } = yield graphQLCaller(`query {
      products(limit: 2, start:${(page || 1)*2 - 2}) {
        title,
        slug,
        price,
        og_image  {
          url
        },
        promotion
      }
    }`);
    yield put({
      type: PRODUCT.update,
      products,
      numberOfProducts
    });
  } catch (error) {
    console.log(error);
  }
}
export function* queryProductDetail({ slug }) {
  try {
    const { products: productDetails } = yield graphQLCaller(`query{
      products(where: {
        slug: "${slug}" 
      }) {
        title,
        details,
        features,
        price,
        og_image {
          url
        },
        detail_images {
          url
        }
      }
    }`);
    yield put({
      type: PRODUCT.update,
      productDetails: {...productDetails[0] },
    });
  } catch (error) {
    console.log(error)
  }
}

export function* queryPromotionProducts (){
  try {
    const { products } = yield graphQLCaller(`query{
      products(where:{ promotion: "true" }) {
        og_image{
          url
        },
        slug,
        title,
        price,
      }
    }`);
    yield put({
      type: PRODUCT.update,
      products,
    });
  } catch (error) {
    
  }
}

export const handlerProducts = () => ({
  type: PRODUCT.handlers.get,
});
export const handlerCountProducts = () => ({
  type: PRODUCT.handlers.count,
});

export const handlerProductsByPage = (
  page, 
  where, 
  hotelType,
  price,
  meals,
) => ({
  type: PRODUCT.handlers.getPage,
  page,
  where,
  hotelType,
  meals,
  price
});
export const handlerPromotionProduct = () => ({
  type: PRODUCT.handlers.getPromotion,
});
export const handlerGetProductDetails = (slug) => ({
  type: PRODUCT.handlers.getDetails,
  slug,
});

export default function* saga() {
  yield all([
    yield takeLatest (PRODUCT.handlers.count, getNumberOfProducts),
    yield takeLatest(PRODUCT.handlers.get, queryProducts),
    yield takeLatest(PRODUCT.handlers.getPage, queryProductsByPage),
    yield takeLatest(PRODUCT.handlers.getPromotion, queryPromotionProducts),
    yield takeLatest(PRODUCT.handlers.getDetails, queryProductDetail),
  ]);
}
