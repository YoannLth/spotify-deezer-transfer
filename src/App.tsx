import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Colors from "./constants/colors";

import Counter from './containers/counter/Counter';

function Home() {
  return (
    <div>
      <h2>Home</h2>

      <Counter />      
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
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
        main: Colors.ERROR
      },
      success: {
        main: Colors.SUCCESS
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </ul>

            <hr />

            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
