import { put, takeLatest, all, call } from "redux-saga/effects";

import { USER } from "../constants";
import { fetchStrapi } from '../../utils/callStrapi';

function* updateUser({ user }) {
  try {
    yield put({
      type: USER.update,
      user,
    });
  } catch (error) {
    console.log(error);
  }
}

function* loginUser({ user, onSuccess }) {
  try {
    const { data } = yield call(fetchStrapi, 
      'post',
      `auth/local`,
      {...user}
      );
    const { jwt, ...rest} = data;
    window.localStorage.setItem('jwt', JSON.stringify(jwt));
    yield* updateUser(rest);
    yield onSuccess();
  } catch (error) {
    console.log(error);
  }
}

export const signInHandler = (user, onSuccess) => ({
  type: USER.signin,
  user,
  onSuccess,
});
export const signOutHandler = () => ({
  type: USER.signOut,
  user: null
});

export default function* saga() {
  yield all([
    yield takeLatest(USER.signin, loginUser),
    yield takeLatest(USER.signOut, updateUser),
  ]);
}
