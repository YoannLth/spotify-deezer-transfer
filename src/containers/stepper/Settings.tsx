import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { StyleSheet } from '../../typings/Style';
import {
  selectSpotifyToken,
  selectDeezerToken,
  setSpotifyToken,
  setDeezerToken,
  verifyTokens,
  selectTokensVerificationState,
} from '../../store/slices/settingsSlice';
import { selectIsContinueButtonEnabled } from '../../store/selectors';
import localStorageConstants from '../../constants/localStorage';

export default () => {
  const dispatch = useAppDispatch();

  const spotifyToken = useAppSelector((state) => selectSpotifyToken(state));
  const deezerToken = useAppSelector((state) => selectDeezerToken(state));

  const isContinueButtonEnabled = useAppSelector((state) =>
    selectIsContinueButtonEnabled(state)
  );
  const tokensVerificationState = useAppSelector((state) =>
    selectTokensVerificationState(state)
  );

  useEffect(() => {
    const spotifyTokenLocalStorage = localStorage.getItem(
      localStorageConstants.KEYS.SPOTIFY_TOKEN
    );
    const deezerTokenLocalStorage = localStorage.getItem(
      localStorageConstants.KEYS.DEEZER_TOKEN
    );

    if (spotifyTokenLocalStorage) {
      dispatch(setSpotifyToken(spotifyTokenLocalStorage));
    }

    if (deezerTokenLocalStorage) {
      dispatch(setDeezerToken(deezerTokenLocalStorage));
    }
  }, []);

  const {
    REACT_APP_SPOTIFY_CLIENT_ID,
    REACT_APP_SPOTIFY_AUTHORIZE_URL,
    REACT_APP_SPOTIFY_REDIRECT_URL,
    REACT_APP_SPOTIFY_API_SCOPES,
    REACT_APP_DEEZER_CLIENT_ID,
    REACT_APP_DEEZER_AUTHORIZE_URL,
    REACT_APP_DEEZER_REDIRECT_URL,
  } = process.env;

  const handleSpotifyLogin = () => {
    window.location.href = `${REACT_APP_SPOTIFY_AUTHORIZE_URL}?client_id=${REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${REACT_APP_SPOTIFY_REDIRECT_URL}&response_type=token&show_dialog=true&scope=${REACT_APP_SPOTIFY_API_SCOPES}`;
  };

  const handleDeezerLogin = () => {
    window.location.href = `${REACT_APP_DEEZER_AUTHORIZE_URL}?app_id=${REACT_APP_DEEZER_CLIENT_ID}&redirect_uri=${REACT_APP_DEEZER_REDIRECT_URL}&response_type=token`;
  };

  const styles: StyleSheet = {
    paper: {
      paddingTop: 24,
      paddingBottom: 24,
      paddingLeft: 40,
      paddingRight: 40,
    },
    textFieldsContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 24,
    },
    spotifyField: { marginBottom: 12 },
    buttonWrapper: { marginTop: 24, position: 'relative' },
    loader: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  };

  return (
    <div>
      <Paper style={styles.paper}>
        <Typography variant="h6" align="left">
          API Tokens
        </Typography>
        <Typography>
          This tool needs tokens to access API to scan your library and add songs and
          playlist to the destination service
        </Typography>
        <div style={styles.textFieldsContainer}>
          <TextField
            id="outlined-basic"
            label="Spotify token"
            variant="outlined"
            style={styles.spotifyField}
            value={spotifyToken}
            disabled
            InputProps={{
              endAdornment: (
                <Button variant="text" color="primary" onClick={handleSpotifyLogin}>
                  get
                </Button>
              ),
            }}
          />

          <TextField
            id="outlined-basic"
            label="Deezer token"
            variant="outlined"
            value={deezerToken}
            disabled
            InputProps={{
              endAdornment: (
                <Button variant="text" color="primary" onClick={handleDeezerLogin}>
                  get
                </Button>
              ),
            }}
          />
        </div>
      </Paper>
      <div style={styles.buttonWrapper}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch(verifyTokens());
          }}
          disabled={!isContinueButtonEnabled}
        >
          Continue
        </Button>
        {tokensVerificationState === 'loading' && (
          <CircularProgress size={24} style={styles.loader} />
        )}
      </div>
    </div>
  );
};
