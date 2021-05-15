import React, { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';

import { StyleSheet } from '../typings/Style';
import { useAppDispatch } from '../hooks';
import { setSpotifyToken, setDeezerToken } from '../store/slices/settingsSlice';
import { getParametersFromURL } from '../utils/url';
import routerConstants from '../constants/router';
import localStorageConstants from '../constants/localStorage';

export default () => {
  const styles: StyleSheet = {
    container: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleOAuthResponse = () => {
    // Get parameters from URL
    const params = getParametersFromURL(window.location.href);

    // Save tokens
    if (history.location.pathname.includes('spotify')) { // TODO: find a better way to handle if / else
      dispatch(setSpotifyToken(params.access_token));
      localStorage.setItem(localStorageConstants.KEYS.SPOTIFY_TOKEN, params.access_token);
    } else if (history.location.pathname.includes('deezer')) {
      dispatch(setDeezerToken(params.access_token));
      localStorage.setItem(localStorageConstants.KEYS.DEEZER_TOKEN, params.access_token);
    }

    // Redirect to stepper page
    history.push(routerConstants.ROUTES.STEPS);
  };

  useEffect(() => {
    handleOAuthResponse();
  }, []);

  return (
    <div style={styles.container}>
      <CircularProgress />
    </div>
  );
};
