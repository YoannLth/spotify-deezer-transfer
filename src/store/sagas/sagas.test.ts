import { verifyTokensSaga } from './settingsSagas';
import { recordSaga } from './sagaTestUtils';
import { incrementStep } from '../slices/stepperSlice';
import * as settingsSlice from '../slices/settingsSlice';
import * as api from '../../utils/api';

describe('settingsSagas', () => {
  describe('verifyTokensSaga', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    afterAll(() => {
      jest.clearAllMocks();
    })

    it('should increment currentStep and set tokensVerificationState to success if saga succeed', async () => {
      jest.spyOn(api, 'fetchSpotifyUserData').mockImplementation((token: string) => new Promise((res) => res(token)));
      jest.spyOn(api, 'fetchDeezerUserData').mockImplementation((token: string) => new Promise((res) => res(token)));
      jest.spyOn(settingsSlice, 'selectDeezerToken').mockImplementation(() => 'deezerToken123');
      jest.spyOn(settingsSlice, 'selectSpotifyToken').mockImplementation(() => 'spotifyToken123');

      const dispatched = await recordSaga(verifyTokensSaga);

      expect(dispatched).toContainEqual(settingsSlice.setTokensVerificationState('success'));
      expect(dispatched).toContainEqual(incrementStep());
    });

    test('should set tokensVerificationState to error if saga fails ', async () => {
      jest.spyOn(api, 'fetchSpotifyUserData').mockImplementation((token: string) => new Promise((res, rej) => rej(token)));
      jest.spyOn(api, 'fetchDeezerUserData').mockImplementation((token: string) => new Promise((res, rej) => rej(token)));
      jest.spyOn(settingsSlice, 'selectDeezerToken').mockImplementation(() => 'deezerToken123');
      jest.spyOn(settingsSlice, 'selectSpotifyToken').mockImplementation(() => 'spotifyToken123');

      const dispatched = await recordSaga(verifyTokensSaga);

      expect(dispatched).toContainEqual(settingsSlice.setTokensVerificationState('error'));
      expect(dispatched).not.toContainEqual(incrementStep());
    });
  });
});
