import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Colors from './constants/colors';

import Home from './screens/Home';

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

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
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/start">
              <About />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
