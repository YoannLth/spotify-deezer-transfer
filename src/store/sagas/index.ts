import { all, fork } from 'redux-saga/effects';
import counterSagas from './counterSagas';

export default function* root() {
  yield all([fork(counterSagas)]);
}
