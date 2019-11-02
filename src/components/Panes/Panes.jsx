/* eslint-disable no-shadow */

import React from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Footer from "../Footer/Footer";

const PanesContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100vh;
  background: transparent;
  display: flex;
`;

const PaneLeft = styled(animated.div)`
  width: 50%;
  height: 100%;
  background-color: white;
  border-right: 1px solid black;
`;

const PaneRight = styled(animated.div)`
  width: 50%;
  height: 100%;
  background-color: gray;
  border-left: 1px solid black;
  position: relative;
`;

const redirectToGame = history => {
  setTimeout(() => {
    history.push("/game");
  }, 750);
};

const Panes = ({ on }) => {
  const history = useHistory();
  const { x } = useSpring({
    x: on ? 100 : 0,
    onRest: on && redirectToGame(history)
  });

  return (
    <PanesContainer>
      <PaneLeft
        style={{
          transform: x.interpolate(x => `translate3d(-${x}%, 0, 0)`)
        }}
      />
      <PaneRight
        style={{
          transform: x.interpolate(x => `translate3d(${x}%, 0, 0)`)
        }}
      >
        <Footer />
      </PaneRight>
    </PanesContainer>
  );
};

export default Panes;
