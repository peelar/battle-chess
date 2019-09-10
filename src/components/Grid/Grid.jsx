import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import Character from '../Character/Character';
import Field from '../Field/Field';
import uuid4 from 'uuid';

const Container = styled.div`
  display: grid;
  grid-template-columns: min-content auto;
  justify-items: center;
  grid-gap: 2rem;
  align-items: center;
  background: gray;
  filter: opacity(0.8);
  height: 100vh;
`;

const Fields = styled.div`
  display: grid;
  grid-template-columns: ${props => props.xdim && `repeat(${props.xdim}, 1fr)`};
  grid-template-rows: ${props => props.ydim && `repeat(${props.ydim}, 1fr)`};
  grid-gap: 0.5rem;
  height: 55%;
  width: 60%;
`;

const SidePanel = styled.div`
  display: flex;
  justify-content: center;
  min-width: 225px;
`;

const createArenaState = (xdim, ydim) => {
  const arenaState = {arena: []};
  for (let i = 0; i < xdim; i++) {
    for (let j = 0; j < ydim; j++) {
      arenaState.arena.push({point: [i, j], populated: false})
    }
  }

  return arenaState;
};

const X_DIM = 4;
const Y_DIM = 4;

const INIT_POINT = [-1, -1];

const comparePositions = (arr1, arr2) => {
  const [x1, y1] = arr1;
  const [x2, y2] = arr2;

  return ((x1 === x2) && (y1 === y2));
}

const Grid = () => {
  const [characterPosition, moveCharacter] = useState([...INIT_POINT]);
  const [isCharacterActive, toggleCharacterActive] = useState(false);
  const [arenaData, changeArenaData] = useState(null);

  const getArenaGrid = (arenaState) => {
    return arenaState.arena.map((field) => {
      const isCharacterOnTheField = comparePositions(field.point, characterPosition);
      return (
        <Field key={uuid4()} point={field.point} active={field.populated} moveCharacterHandler={() => moveCharacterHandler(field.point, isCharacterActive)} isCharacterOn={isCharacterOnTheField}>
          <Character isCharacterActive={isCharacterActive} toggleCharacterActive={toggleCharacterActive} />
        </Field>
      )
    })
  }

  useEffect(() => {
    const initArena = createArenaState(X_DIM, Y_DIM);
    changeArenaData(initArena);
  }, []);

  const moveCharacterHandler = (point, isCharacterActive) => {
    if (!isCharacterActive) return null;
    moveCharacter(point);
  };

  const isCharacterInStartingPoint = comparePositions(characterPosition, INIT_POINT);

  return (
    <Container>
      <SidePanel
      >
        {isCharacterInStartingPoint && (<Character isCharacterActive={isCharacterActive} toggleCharacterActive={toggleCharacterActive} />)}
      </SidePanel>
      <Fields xdim={X_DIM} ydim={Y_DIM}>
        {arenaData !== null && (
          getArenaGrid(arenaData)
        )}
      </Fields>
    </Container>
  )
}

export default Grid
