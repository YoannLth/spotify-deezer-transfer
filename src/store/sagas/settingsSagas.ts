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
import { fetchSpotifyUserData, fetchDeezerUserData } from '../../utils/api';

export function* verifyTokensSaga() {
  try {
    const state: RootState = yield select();
    const spotifyToken = selectSpotifyToken(state);
    const deezerToken = selectDeezerToken(state);

    // TODO: find a better way to handle token verification
    const spotifyJson: Promise<any> = yield call(fetchSpotifyUserData, spotifyToken);

    // TODO: find a better way to handle token verification
    const deezerJson: Promise<any> = yield call(fetchDeezerUserData, deezerToken);

    // TODO: REMOVE this log
    // eslint-disable-next-line no-console
    console.log(spotifyJson, deezerJson);

    yield put(setTokensVerificationState('success'));
    yield put(incrementStep());
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
