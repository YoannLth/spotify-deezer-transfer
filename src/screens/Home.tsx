import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { StyleSheet } from '../typings/Style';

import HomeCard from '../components/HomeCard';

import logo from '../assets/images/icon.png';
import spotifyIcon from '../assets/images/spotify-icon.png';
import deezerIcon from '../assets/images/deezer-icon.png';
import {
  ArrowRightIcon,
  SettingsIcon,
  SyncIcon,
  FindIcon,
} from '../assets/images/icons';

import colors from '../constants/colors';

export default () => {
  const styles: StyleSheet = {
    container: {
      paddingTop: 48,
      paddingBottom: 48,
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      alignContent: 'center',
    },
    content: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontWeight: 600,
      marginBottom: 16,
    },
    itemContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    iconWrapper: {
      height: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  const renderHeader = (): JSX.Element => {
    const fnStyles: StyleSheet = {
      text: {
        fontWeight: 600,
        marginBottom: 16,
      },
      itemContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
      iconWrapper: {
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    };

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={fnStyles.itemContainer}>
            <Typography
              variant="h3"
              style={{ ...fnStyles.text, color: colors.GREEN_SPOTIFY }}
            >
              Spotify
            </Typography>
            <div style={fnStyles.iconWrapper}>
              <img src={spotifyIcon} alt="Spotify logo" />
            </div>
          </div>
          <div
            style={{ ...fnStyles.itemContainer, marginLeft: 24, marginRight: 24 }}
          >
            <Typography variant="h3">to</Typography>
            <div style={fnStyles.iconWrapper}>
              <ArrowRightIcon style={{ fontSize: 96 }} />
            </div>
          </div>
          <div style={fnStyles.itemContainer}>
            <Typography
              variant="h3"
              style={{ ...fnStyles.text, color: colors.BLUE_DEEZER }}
            >
              Deezer
            </Typography>
            <div style={fnStyles.iconWrapper}>
              <img src={deezerIcon} alt="Deezer logo" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCards = (): JSX.Element => {
    const fnStyles: StyleSheet = {
      container: {
        marginTop: 48,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 24,
      },
      icon: { fontSize: 36 },
    };

    return (
      <Grid container spacing={3} style={fnStyles.container}>
        <Grid item>
          <HomeCard
            number={1}
            title="Configure"
            text="Set your API tokens"
            icon={<SettingsIcon style={fnStyles.icon} />}
          />
        </Grid>
        <Grid item>
          <HomeCard
            number={2}
            title="Scan"
            text="Scan your songs and playlists"
            icon={<FindIcon style={fnStyles.icon} />}
          />
        </Grid>
        <Grid item>
          <HomeCard
            number={3}
            title="Transfer"
            text="Let the script transfer your data"
            icon={<SyncIcon style={fnStyles.icon} />}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="Logo" />
      <div style={styles.content}>
        {renderHeader()}
        {renderCards()}
        <Button component={Link} to="/start" variant="contained" color="primary">
          Start
        </Button>
      </div>
    </div>
  );
};
