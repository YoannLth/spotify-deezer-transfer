import store from '../index';
import {
  setSpotifyToken,
  setDeezerToken,
  verifyTokens,
  setTokensVerificationState,
  reset as resetSettingsSlice,
  selectTokensVerificationState,
} from './settingsSlice';
import {
  incrementStep,
  decrementStep,
  setCurrentStep,
  reset as resetStepperSlice,
  selectCurrentStep,
} from './stepperSlice';

describe('settingsSlice', () => {
  afterEach(() => {
    store.dispatch(resetSettingsSlice());
  });

  test('reset', () => {
    const initialState = store.getState().settings;
    store.dispatch(setSpotifyToken('123'));
    expect(store.getState().settings).not.toBe(initialState);

    store.dispatch(resetSettingsSlice());
    expect(store.getState().settings).toBe(initialState);
  });

  test('setDeezerToken', () => {
    let settingsState = store.getState().settings;
    expect(settingsState).toBeDefined();
    expect(settingsState.spotifyToken).toBe('');

    const newToken = '123';
    store.dispatch(setTokensVerificationState('error'));
    store.dispatch(setSpotifyToken(newToken));
    settingsState = store.getState().settings;
    expect(settingsState.spotifyToken).toBe(newToken);
    expect(settingsState.tokensVerificationState).toBe('unknown');
  });

  test('setSpotifyToken', () => {
    let settingsState = store.getState().settings;
    expect(settingsState).toBeDefined();
    expect(settingsState.deezerToken).toBe('');

    const newToken = '123';
    store.dispatch(setTokensVerificationState('error'));
    store.dispatch(setDeezerToken(newToken));
    settingsState = store.getState().settings;
    expect(settingsState.deezerToken).toBe(newToken);
    expect(settingsState.tokensVerificationState).toBe('unknown');
  });

  test('setTokensVerificationState', () => {
    let settingsState = store.getState().settings;
    expect(settingsState).toBeDefined();
    expect(settingsState.tokensVerificationState).toBe('unknown');

    store.dispatch(setTokensVerificationState('error'));
    settingsState = store.getState().settings;
    expect(settingsState.tokensVerificationState).toBe('error');
  });

  test('verifyTokens', () => {
    let settingsState = store.getState().settings;
    expect(settingsState).toBeDefined();
    expect(settingsState.tokensVerificationState).toBe('unknown');

    store.dispatch(verifyTokens());
    settingsState = store.getState().settings;
    expect(settingsState.tokensVerificationState).toBe('loading');
  });

  test('selectTokensVerificationState', () => {
    store.dispatch(setTokensVerificationState('error'));
    const state = store.getState();
    expect(selectTokensVerificationState(state)).toBe('error');
  });
});

describe('stepperSlice', () => {
  afterEach(() => {
    store.dispatch(resetSettingsSlice());
  });

  test('reset', () => {
    const initialState = store.getState().stepper;
    store.dispatch(setCurrentStep(1));
    expect(store.getState().stepper).not.toBe(initialState);

    store.dispatch(resetStepperSlice());
    expect(store.getState().stepper).toBe(initialState);
  });

  test('incrementStep', () => {
    const initialState = store.getState().stepper;
    expect(initialState.currentStep).toBe(0);

    store.dispatch(incrementStep());
    expect(store.getState().stepper.currentStep).toBe(1);

    store.dispatch(incrementStep());
    store.dispatch(incrementStep());
    expect(store.getState().stepper.currentStep).toBe(3);
  });

  test('setCurrentStep', () => {
    expect(store.getState().stepper.currentStep).not.toBe(999);
    store.dispatch(setCurrentStep(999));
    expect(store.getState().stepper.currentStep).toBe(999);
  });

  test('decrementStep', () => {
    store.dispatch(setCurrentStep(3));
    store.dispatch(decrementStep());
    expect(store.getState().stepper.currentStep).toBe(2);

    store.dispatch(decrementStep());
    store.dispatch(decrementStep());
    expect(store.getState().stepper.currentStep).toBe(0);
  });

  test('selectCurrentStep', () => {
    const value = 3;
    store.dispatch(setCurrentStep(3));
    expect(selectCurrentStep(store.getState())).toBe(value);
  });
});
