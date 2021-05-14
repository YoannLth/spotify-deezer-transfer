import { put, takeEvery, all, fork } from 'redux-saga/effects';
import { increment } from '../slices/counterSlice';

function* fetchUser() {
  try {
    const user = { message: 'Hello World' };
    yield put({ type: 'USER_FETCH_SUCCEEDED', user });
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* watchIncrement() {
  yield takeEvery(increment.type, fetchUser);
}

export default function* root() {
  yield all([fork(watchIncrement)]);
}
