import { all, fork } from 'redux-saga/effects';
import settingsSagas from './settingsSagas';

export default function* root() {
  yield all([fork(settingsSagas)]);
}
