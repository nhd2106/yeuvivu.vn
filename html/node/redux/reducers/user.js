import { USER } from "../constants";
const initialState = {
  user: null,
};

export default function user(state = initialState, action) {
  const { user } = action;
  switch (action.type) {
    case USER.signin:
      return {
        ...state,
        handling: true,
      };
    case USER.signOut:
      return {
        ...state,
        handling: true,
      };
    case USER.update:
      return {
        ...state,
        user,
        handling: false,
      };
    default:
      return state;
  }
}
