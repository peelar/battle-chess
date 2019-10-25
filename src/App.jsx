import React, { useState, useEffect } from "react";
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
  const generateGameKey = number => `GAME-${number}`;

  const [gameNumber, changeGame] = useState(0);
  const [gameKey, changeGameKey] = useState(generateGameKey(gameNumber));

  const playAgainHandler = () => {
    changeGame(gameNumber + 1);
  };

  useEffect(() => {
    changeGameKey(generateGameKey(gameNumber));
  }, [gameNumber]);

  return (
    <>
      <Overlay playAgain={playAgainHandler} />
      <MainGrid>
        <GlobalStyle />
        <Hud show />
        <Grid key={gameKey} />
      </MainGrid>
    </>
  );
}

export default App;
