import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Board from "../Board/Board";
import { changePlayersState, changeFieldsState } from "../../redux/rootActions";
import { PAD_SMALL, PAD_LARGE, DESKTOP_SMALL, MOBILE_LARGE } from "../../breakpoints";
import { initializeGame } from "../../redux/helpers";

const Container = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  background: whitesmoke;
  height: 80vh;
  filter: opacity(0.8);

  @media (min-width: ${DESKTOP_SMALL}) {
    height: 70vh;
  }
`;

const Fields = styled.div`
  display: grid;
  grid-template-columns: ${props => props.xdim && `repeat(${props.xdim}, 1fr)`};
  grid-template-rows: ${props => props.ydim && `repeat(${props.ydim}, 1fr)`};
  grid-gap: 0.5rem;
  max-width: 650px;
  height: 60vh;
  width: 95%;
  max-height: 370px;

  @media (min-width: ${MOBILE_LARGE}) {
    max-height: unset;
  }

  @media (min-width: ${PAD_SMALL}) {
    width: 100%;
  }

  @media (min-width: ${PAD_LARGE}) {
    height: 65vh;
    max-width: 750px;
    max-height: 650px;
  }

  @media (min-width: ${DESKTOP_SMALL}) {
    max-width: 650px;
  }
`;

const Grid = ({ dispatchChangeTeams, dispatchChangeFields }) => {
  const [grid, changeGrid] = useState(null);
  const [engine, setEngine] = useState(null);
  const DIM = 6;

  useEffect(() => {
    const game = initializeGame(DIM);
    setEngine(game);
  }, []);

  useEffect(() => {
    if (engine !== null) {
      const gamestate = engine.getGameState();
      const { initialTeams, initialFields, initialGrid } = gamestate;

      changeGrid(initialGrid);

      dispatchChangeTeams(initialTeams);
      dispatchChangeFields(initialFields);
    }
  }, [dispatchChangeFields, dispatchChangeTeams, engine]);

  return (
    <Container>
      <Fields xdim={DIM} ydim={DIM}>
        <Board grid={grid} />
      </Fields>
    </Container>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatchChangeTeams: teams => dispatch(changePlayersState(teams)),
  dispatchChangeFields: field => dispatch(changeFieldsState(field))
});

export default connect(
  null,
  mapDispatchToProps
)(Grid);
