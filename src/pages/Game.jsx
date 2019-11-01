import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";
import Grid from "../components/Grid/Grid";
import Hud from "../components/Hud/Hud";
import Overlay from "../components/Overlay/Overlay";

const MainGrid = styled(animated.main)`
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

  const fadeIn = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: config.gentle
  });

  return (
    <>
      <Overlay playAgain={playAgainHandler} />
      <MainGrid style={fadeIn}>
        <Hud show />
        <Grid key={gameKey} />
      </MainGrid>
    </>
  );
}

export default Game;
