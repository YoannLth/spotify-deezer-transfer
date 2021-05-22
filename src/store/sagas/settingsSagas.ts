import { call, put, takeEvery, all, fork, select } from 'redux-saga/effects';
import { logError } from '../../utils/logger';
import { RootState } from '../index';
import {
  verifyTokens,
  setTokensVerificationState,
  selectSpotifyToken,
  selectDeezerToken,
} from '../slices/settingsSlice';
import { incrementStep } from '../slices/stepperSlice';
import syncEngine from '../../typings/SynchronizationEngine';
import SpotifyEngine from '../../typings/SpotifyEngine';
import DeezerEngine from '../../typings/DeezerEngine';

export function* verifyTokensSaga() {
  try {
    const state: RootState = yield select();
    const spotifyToken = selectSpotifyToken(state);
    const deezerToken = selectDeezerToken(state);

    const inputEngine = new SpotifyEngine(spotifyToken);
    const outputEngine = new DeezerEngine(deezerToken);
    syncEngine.init(inputEngine, outputEngine);

    const servicesConnectionSucceed: boolean = yield call(
      syncEngine.checkServicesConnection
    );

    if (servicesConnectionSucceed) {
      yield put(setTokensVerificationState('success'));
      yield put(incrementStep());
    } else {
      yield put(setTokensVerificationState('error'));
    }
  } catch (e) {
    logError(e);
    yield put(setTokensVerificationState('error'));
  }
}

function* watchVerifyTokens() {
  yield takeEvery(verifyTokens.type, verifyTokensSaga);
}

export default function* root() {
  yield all([fork(watchVerifyTokens)]);
}
