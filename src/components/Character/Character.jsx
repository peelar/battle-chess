import React from 'react';
import styled, { css } from 'styled-components';

const Dot = styled.div`
  height: 4.5rem;
  width: 4.5rem;
  background-color: black;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;

  ${(props) => props.isSecondary && css`
    background-color: white;
    border: 1px solid black;
  `};

  &:hover {
    ${(props) => !props.active && css`
      border: 2px solid gold;
      box-sizing: border-box;
    `};
  }

  ${(props) => props.active && css`
    border: 2px solid goldenrod;
    box-sizing: border-box;
  `};
`;

const Character = ({
  character, isCharacterActive, toggleCharacterActive, isCharacterOn,
}) => {
  const { team } = character;
  const isSecondary = team === 1;
  return (
    <Dot isSecondary={isSecondary} active={isCharacterActive} shadow={isCharacterOn} onClick={() => toggleCharacterActive(!isCharacterActive)} />
  );
};

export default Character;
