import type { RootState } from '../index';

// TODO: remove this
// eslint-disable-next-line import/prefer-default-export
export const selectIsContinueButtonEnabled = (state: RootState): boolean => {
  switch (state.stepper.currentStep) {
    case 0:
      return (
        state.settings.deezerToken?.length > 0 &&
        state.settings.spotifyToken?.length > 0 &&
        state.settings.tokensVerificationState !== 'loading'
      );
    default:
      return false;
  }
};
