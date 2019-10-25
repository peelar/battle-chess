import React from "react";
import { connect } from "react-redux";
import "./App.css";
import styled, { createGlobalStyle, css } from "styled-components";
import Grid from "./components/Grid/Grid";
import Hud from "./components/Hud/Hud";
import { MOBILE_S, DEFAULT, XL } from "./breakpoints";

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

const MainGrid = styled.main`
  display: grid;
  grid-template-rows: 1fr auto;
`;

const teams = ["black", "White"];

function App({ isGameOn, activeTeam }) {
  return (
    <>
      <Overlay show={!isGameOn}>
        <h1>{`Team ${teams[activeTeam]} won`}</h1>
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

export default connect(mapStateToProps)(App);
