import React from 'react'
import styled, { css } from 'styled-components'

const Kropek = styled.div`
  height: 75px;
  width: 75px;
  background-color: black;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;

  ${props => props.active && css`
    border: 1px solid gold;
  `};
`;

const Character = ({ isCharacterActive, toggleCharacterActive }) => {
  return (
    <Kropek active={isCharacterActive} onClick={() => toggleCharacterActive(!isCharacterActive)} />
  )
}

export default Character
