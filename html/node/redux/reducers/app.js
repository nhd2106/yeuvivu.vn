import { APP } from "../constants";
const initialState = {
  pages: [],
};

export default function app(state = initialState, action) {
  const { pages } = action;
  switch (action.type) {
    case APP.handlers.pages:
      return {
        ...state,
        handling: true,
      };
    case APP.update:
      return {
        ...state,
        pages,
        handling: false,
      };
    default:
      return state;
  }
}
