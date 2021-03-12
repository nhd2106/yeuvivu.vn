import { BLOG } from "../constants";
const initialState = {
  posts: [],
  postDetails: {},
};

export default function blog(state = initialState, action) {
  const { posts, postDetails } = action;
  switch (action.type) {
    case BLOG.handlers.get:
      return {
        ...state,
        handling: true,
      };
    case BLOG.update:
      return {
        ...state,
        posts,
        postDetails,
        handling: false,
      };
    default:
      return state;
  }
}
