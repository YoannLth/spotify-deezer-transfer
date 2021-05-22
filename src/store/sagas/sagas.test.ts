import { verifyTokensSaga } from './settingsSagas';
import { recordSaga } from './sagaTestUtils';
import { incrementStep } from '../slices/stepperSlice';
import * as settingsSlice from '../slices/settingsSlice';
import syncEngine from '../../typings/SynchronizationEngine';

describe('settingsSagas', () => {
  describe('verifyTokensSaga', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    afterAll(() => {
      jest.clearAllMocks();
    })

    it('should increment currentStep and set tokensVerificationState to success if saga succeed', async () => {
      jest.spyOn(syncEngine, 'checkServicesConnection').mockImplementation(() => new Promise((res) => res(true)));
      jest.spyOn(settingsSlice, 'selectDeezerToken').mockImplementation(() => 'deezerToken123');
      jest.spyOn(settingsSlice, 'selectSpotifyToken').mockImplementation(() => 'spotifyToken123');

      const dispatched = await recordSaga(verifyTokensSaga);

      expect(dispatched).toContainEqual(settingsSlice.setTokensVerificationState('success'));
      expect(dispatched).toContainEqual(incrementStep());
    });

    test('should set tokensVerificationState to error if saga fails', async () => {
      jest.spyOn(syncEngine, 'checkServicesConnection').mockImplementation(() => new Promise((res) => res(false)));
      jest.spyOn(settingsSlice, 'selectDeezerToken').mockImplementation(() => 'deezerToken123');
      jest.spyOn(settingsSlice, 'selectSpotifyToken').mockImplementation(() => 'spotifyToken123');

      const dispatched = await recordSaga(verifyTokensSaga);

      expect(dispatched).toContainEqual(settingsSlice.setTokensVerificationState('error'));
      expect(dispatched).not.toContainEqual(incrementStep());
    });

    test('should set tokensVerificationState to error if saga throws error', async () => {
      jest.spyOn(syncEngine, 'checkServicesConnection').mockImplementation(() => {
        throw new Error('');
      });
      jest.spyOn(settingsSlice, 'selectDeezerToken').mockImplementation(() => 'deezerToken123');
      jest.spyOn(settingsSlice, 'selectSpotifyToken').mockImplementation(() => 'spotifyToken123');

      const dispatched = await recordSaga(verifyTokensSaga);

      expect(dispatched).toContainEqual(settingsSlice.setTokensVerificationState('error'));
      expect(dispatched).not.toContainEqual(incrementStep());
    });
  });
});
