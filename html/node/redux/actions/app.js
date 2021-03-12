import { put, takeLatest, all, call } from "redux-saga/effects";

import { APP } from "../constants";
import { fetchStrapi } from "../../utils/callStrapi";

function* fetchNavigations({ id }) {
  try {
    const { data: pages } = yield call(fetchStrapi, "pages");
    yield put({
      type: APP.update,
      pages,
    });
  } catch (error) {
    console.log(error);
  }
}

export const handlerGetNavigations = () => ({
  type: APP.handlers.navigations,
});

export default function* saga() {
  yield all([yield takeLatest(APP.handlers.navigations, fetchNavigations)]);
}
