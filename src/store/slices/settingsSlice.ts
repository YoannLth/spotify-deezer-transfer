import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface CounterState {
  spotifyToken: string;
  deezerToken: string;
  tokensVerificationState: TokensVerificationState;
}

type TokensVerificationState = 'success' | 'error' | 'loading' | 'unknown';

export const initialState: CounterState = {
  spotifyToken: '',
  deezerToken: '',
  tokensVerificationState: 'unknown',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSpotifyToken: (state, action: PayloadAction<string>) => {
      state.spotifyToken = action.payload;
      state.tokensVerificationState = 'unknown';
    },
    setDeezerToken: (state, action: PayloadAction<string>) => {
      state.deezerToken = action.payload;
      state.tokensVerificationState = 'unknown';
    },
    verifyTokens: (state) => {
      state.tokensVerificationState = 'loading';
    },
    setTokensVerificationState: (
      state,
      action: PayloadAction<TokensVerificationState>
    ) => {
      state.tokensVerificationState = action.payload;
    },
    reset: () => initialState,
  },
});

export const selectSpotifyToken = (state: RootState) => state.settings.spotifyToken;
export const selectDeezerToken = (state: RootState) => state.settings.deezerToken;
export const selectTokensVerificationState = (state: RootState) =>
  state.settings.tokensVerificationState;

export const {
  setSpotifyToken,
  setDeezerToken,
  verifyTokens,
  setTokensVerificationState,
  reset,
} = settingsSlice.actions;

export default settingsSlice;
