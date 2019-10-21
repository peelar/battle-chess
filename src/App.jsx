import React from "react";
import "./App.css";
import { createGlobalStyle } from "styled-components";
import Grid from "./components/Grid/Grid";
import Interface from "./components/Interface/Interface";
import { MOBILE_S, DEFAULT, XL } from "./breakpoints";

const GlobalStyle = createGlobalStyle`
  html {
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
    <div className="App">
      <GlobalStyle />
      <Interface show />
      <Grid />
    </div>
  );
}

export default App;
