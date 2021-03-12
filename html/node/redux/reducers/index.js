import { combineReducers } from "redux";
import blog from "./blog";
import app from "./app";
import user from "./user";
import products from "./products";
import cart from "./cart";

const rootReducer = combineReducers({
  blog,
  app,
  user,
  products,
  cart,
});

export default rootReducer;
