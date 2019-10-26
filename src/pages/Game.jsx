import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Grid from "../components/Grid/Grid";
import Hud from "../components/Hud/Hud";
import Overlay from "../components/Overlay/Overlay";

const MainGrid = styled.main`
  display: grid;
  grid-template-rows: 1fr auto;
`;

function Game() {
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
        <Hud show />
        <Grid key={gameKey} />
      </MainGrid>
    </>
  );
}

export default Game;
