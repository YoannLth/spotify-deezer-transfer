import { put, takeEvery, all, fork, select } from 'redux-saga/effects';
import apiConstants from '../../constants/api';
import { logError } from '../../utils/logger';
import { RootState } from '../index';
import {
  verifyTokens,
  setTokensVerificationState,
  selectSpotifyToken,
  selectDeezerToken,
} from '../slices/settingsSlice';
import { incrementStep } from '../slices/stepperSlice';

function* verifyTokensSaga() {
  try {
    const state: RootState = yield select();
    const spotifyToken = selectSpotifyToken(state);
    const deezerToken = selectDeezerToken(state);

    // TODO: find a better way to handle token verification
    const spotifyJson: Promise<any> = yield fetch(`${apiConstants.SPOTIFY_API_BASE_URL}/v1/me`, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    }).then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      }

      throw new Error(`Error calling fetch: ${response.status}`);
    });

    // TODO: find a better way to handle token verification
    const deezerJson: Promise<any> = yield fetch(
      `${apiConstants.DEEZER_API_BASE_URL}/user/me?access_token=${deezerToken}`
    ).then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      }

      throw new Error(`Error calling fetch: ${response.status}`);
    });

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
