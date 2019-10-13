import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Board from '../Board/Board';
import {
  changeTeamsState, changeFieldsState,
} from '../../redux/rootActions';
import GameGenerator from '../../redux/gameGenerator';
import {
  PAD_S, PAD_L, DESKTOP, DEFAULT,
} from '../../breakpoints';

const DIM = 6;
const generator = new GameGenerator(DIM, 5);
generator.createGameState();

const Container = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  background: gray;
  filter: opacity(0.8);
  height: 100vh;
`;

const Fields = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.xdim && `repeat(${props.xdim}, 1fr)`};
  grid-template-rows: ${(props) => props.ydim && `repeat(${props.ydim}, 1fr)`};
  grid-gap: 0.5rem;
  max-width: 650px;
  height: 60vh;
  width: 95%;
  max-height: 370px;

  @media (min-width: ${DEFAULT}) {
    max-height: unset;
  }

  @media (min-width: ${PAD_S}) {
    width: 100%;
  }

  @media (min-width: ${PAD_L}) {
    height: 65vh;
    max-width: 750px;
    max-height: 650px;
  }

  @media (min-width: ${DESKTOP}) {
    max-width: 650px;
  }
`;

const Grid = ({
  dispatchChangeTeams, dispatchChangeFields,
}) => {
  const [grid, changeGrid] = useState(null);

  useEffect(() => {
    const gamestate = generator.getGameState();
    const { initialTeams, initialFields, initialGrid } = gamestate;

    changeGrid(initialGrid);

    dispatchChangeTeams(initialTeams);
    dispatchChangeFields(initialFields);
  }, []);

  return (
    <Container>
      <Fields xdim={DIM} ydim={DIM}>
        <Board grid={grid} />
      </Fields>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchChangeTeams: (teams) => dispatch(changeTeamsState(teams)),
  dispatchChangeFields: (field) => dispatch(changeFieldsState(field)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Grid);
