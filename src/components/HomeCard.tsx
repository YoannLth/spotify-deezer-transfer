import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { StyleSheet } from '../typings/Style';

import colors from '../constants/colors';

type HomeCardProps = {
  number: number;
  title: string;
  text: string;
  icon: React.ReactNode;
};

export default ({ number, title, text, icon }: HomeCardProps): JSX.Element => {
  const styles: StyleSheet = {
    container: { borderRadius: 6, width: 300, height: 290 },
    accent: {
      backgroundColor: colors.PRIMARY,
      height: 8,
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
    },
    body: {
      paddingTop: 24,
      paddingBottom: 24,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    numberContainer: {
      backgroundColor: colors.PRIMARY_100,
      width: 72,
      height: 72,
      borderRadius: 72,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
    number: { color: colors.PRIMARY, fontWeight: 600 },
    iconWrapper: {
      marginTop: 16,
      marginBottom: 16,
    },
    text: { marginTop: 8 },
  };

  return (
    <Paper style={styles.container}>
      <div style={styles.accent} />
      <div style={styles.body}>
        <div style={styles.numberContainer}>
          <Typography variant="h4" component="p" style={styles.number}>
            {number}
          </Typography>
        </div>
        <div style={styles.iconWrapper}>{icon}</div>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body1" color="textSecondary" style={styles.text}>
          {text}
        </Typography>
      </div>
    </Paper>
  );
};
