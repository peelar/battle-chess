import React from 'react';
import styled, { css } from 'styled-components';
import {
  DEFAULT, MOBILE_S, PAD_L, DESKTOP,
} from '../../breakpoints';

const Dot = styled.div`
  height: 5.5rem;
  width: 5.5rem;
  max-height: 45px;
  max-width: 45px;
  background-color: black;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;

  @media (min-width: ${MOBILE_S}) {
    max-height: 50px;
    max-width: 50px;
  }

  @media (min-width: ${DEFAULT}) {
    max-height: 70px;
    max-width: 70px;
  }

  @media (min-width: ${PAD_L}) {
    max-height: 82px;
    max-width: 82px;
  }

  @media (min-width: ${DESKTOP}) {
    max-height: 70px;
    max-width: 70px;
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

    ${(props) => props.fade && css`
      filter: opacity(1);
    `};
  }

  ${(props) => props.active && css`
    border: 2px solid goldenrod;
    box-sizing: border-box;
  `};


  ${(props) => props.fade && css`
    filter: opacity(.25);
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
