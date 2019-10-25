import React from "react";
import { GiCrossedSwords } from "react-icons/gi";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import Button from "../Button/Button";
import { resetGame } from "../../redux/rootActions";

const Container = styled.div`
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

const teams = ["black", "White"];

const Overlay = ({ isGameOn, activeTeam, dispatchResetGame }) => {
  return (
    <Container show>
      <Content>
        <h1>{`Team ${teams[activeTeam]} won`}</h1>
        <Button type="button" onClick={() => dispatchResetGame()}>
          <GiCrossedSwords />
          Play Again
        </Button>
      </Content>
    </Container>
  );
};

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
)(Overlay);
