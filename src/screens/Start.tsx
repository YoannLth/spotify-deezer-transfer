import React from 'react';

import { StyleSheet } from '../typings/Style';
import logo from '../assets/images/icon.png';
import Stepper from '../containers/stepper/Stepper';

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
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="Logo" />
      <div style={styles.content}>
        <Stepper />
      </div>
    </div>
  );
};
