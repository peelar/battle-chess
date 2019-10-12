import React from 'react';
import styled, { css } from 'styled-components';
import { DEFAULT } from '../../breakpoints';

const Dot = styled.div`
  height: 4.5rem;
  width: 4.5rem;
  max-height: 7.5vh;
  background-color: black;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;

  @media (min-width: ${DEFAULT}) {
    max-height: unset;
  }

  ${(props) => props.isSecondary && css`
    background-color: white;
    border: 1px solid black;
  `};

  &:hover {
    ${(props) => !props.active && !props.fade && css`
      border: 2px solid gold;
      box-sizing: border-box;
    `};
  }

  ${(props) => props.active && css`
    border: 2px solid goldenrod;
    box-sizing: border-box;
  `};


  ${(props) => props.fade && css`
    filter: opacity(.25);
    cursor: not-allowed;
  `};
`;

const Character = ({
  character, isCharacterActive, toggleCharacterActive, isCharacterOn, isTeamUnactive,
}) => {
  const { team } = character;
  const isSecondary = team === 1;
  return (
    <Dot isSecondary={isSecondary} active={isCharacterActive} fade={isTeamUnactive} shadow={isCharacterOn} onClick={() => toggleCharacterActive(!isCharacterActive)} />
  );
};

export default Character;
