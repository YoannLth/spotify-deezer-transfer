import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Colors from './constants/colors';

import Home from './screens/Home';
import Settings from './screens/Start';
import Redirect from './screens/Redirect';
import router from './constants/router';

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: Colors.PRIMARY,
      },
      error: {
        main: Colors.ERROR,
      },
      success: {
        main: Colors.SUCCESS,
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path={router.ROUTES.HOME}>
              <Home />
            </Route>
            <Route path={router.ROUTES.STEPS}>
              <Settings />
            </Route>
            <Route path={router.ROUTES.REDIRECT_AUTH_SPOTIFY}>
              <Redirect />
            </Route>
            <Route path={router.ROUTES.REDIRECT_AUTH_DEEZER}>
              <Redirect />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
