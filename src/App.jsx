import React from "react";
import "./App.css";
import styled, { createGlobalStyle } from "styled-components";
import Grid from "./components/Grid/Grid";
import Hud from "./components/Hud/Hud";
import { MOBILE_S, DEFAULT, XL } from "./breakpoints";
import Overlay from "./components/Overlay/Overlay";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
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

const MainGrid = styled.main`
  display: grid;
  grid-template-rows: 1fr auto;
`;

function App() {
  return (
    <>
      <Overlay />
      <MainGrid>
        <GlobalStyle />
        <Hud show />
        <Grid />
      </MainGrid>
    </>
  );
}

export default App;
