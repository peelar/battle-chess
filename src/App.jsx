import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Game from "./pages/Game";
import Home from "./pages/Home";
import { MOBILE_S, DEFAULT, XL } from "./breakpoints";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;

    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    @media (min-width: ${MOBILE_S}) {
      font-size: 12px;
    }

    @media (min-width: ${DEFAULT}) {
      font-size: 15px;
    }

    @media (min-width: ${XL}) {
      font-size: 18px;
    }
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
