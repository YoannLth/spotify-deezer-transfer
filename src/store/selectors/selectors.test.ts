import { selectIsContinueButtonEnabled } from './index';
import { RootState } from '../index';
import mockState from '../mock/mockState';

describe('selectIsContinueButtonEnabled', () => {
  let state: RootState;

  beforeEach(() => {
    state = mockState;
  });

  test('step 0 - returns true when required data is set', () => {
    state.settings.deezerToken = '123';
    state.settings.spotifyToken = '123';
    state.settings.tokensVerificationState = 'unknown';

    expect(selectIsContinueButtonEnabled(state)).toBe(true);
  });

  test('step 0 - returns false when required data is not set', () => {
    state.settings.deezerToken = '';
    state.settings.spotifyToken = '123';
    state.settings.tokensVerificationState = 'unknown';
    expect(selectIsContinueButtonEnabled(state)).toBe(false);

    state.settings.deezerToken = '123';
    state.settings.spotifyToken = '';
    state.settings.tokensVerificationState = 'unknown';
    expect(selectIsContinueButtonEnabled(state)).toBe(false);

    state.settings.deezerToken = '123';
    state.settings.spotifyToken = '123';
    state.settings.tokensVerificationState = 'loading';
    expect(selectIsContinueButtonEnabled(state)).toBe(false);

    state.settings.deezerToken = '';
    state.settings.spotifyToken = '';
    state.settings.tokensVerificationState = 'loading';
    expect(selectIsContinueButtonEnabled(state)).toBe(false);
  });

  test('returns false for steps other than 0', () => { // TODO: remove this test
    state.stepper.currentStep = 1;
    expect(selectIsContinueButtonEnabled(state)).toBe(false);

    state.stepper.currentStep = 2;
    expect(selectIsContinueButtonEnabled(state)).toBe(false);
  });
});
