import React from "react";
import { connect } from "react-redux";
import "./App.css";
import styled, { createGlobalStyle, css } from "styled-components";
import { GiCrossedSwords } from "react-icons/gi";
import Grid from "./components/Grid/Grid";
import Hud from "./components/Hud/Hud";
import { MOBILE_S, DEFAULT, XL } from "./breakpoints";
import Button from "./components/Button/Button";
import { resetGame } from "./redux/rootActions";

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

const Overlay = styled.div`
  ${props =>
    props.show
      ? css`
          display: flex;
        `
      : css`
          display: none;
        `};
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: white;
  filter: opacity(0.75);
  z-index: 15;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 3rem;
  }
`;

const Content = styled.div`
  padding: 1rem;
  display: grid;
  align-items: center;
  justify-items: center;
`;

const MainGrid = styled.main`
  display: grid;
  grid-template-rows: 1fr auto;
`;

const teams = ["black", "White"];

function App({ isGameOn, activeTeam, dispatchResetGame }) {
  return (
    <>
      <Overlay show>
        <Content>
          <h1>{`Team ${teams[activeTeam]} won`}</h1>
          <Button type="button" onClick={() => dispatchResetGame()}>
            <GiCrossedSwords />
            Wanna play again?
          </Button>
        </Content>
      </Overlay>
      <MainGrid>
        <GlobalStyle />
        <Hud show />
        <Grid />
      </MainGrid>
    </>
  );
}

const mapStateToProps = state => ({
  isGameOn: state.gameState.active,
  activeTeam: state.gameState.activeTeam
});

const mapDispatchToProps = dispatch => ({
  dispatchResetGame: () => dispatch(resetGame())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
