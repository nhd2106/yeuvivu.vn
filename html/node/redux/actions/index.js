import { all } from "redux-saga/effects";
import blog from "./blog";
import app from "./app";
import user from "./user";
import products from "./products";

export default function* rootSaga() {
  yield all([blog(), app(), user(), products()]);
}
