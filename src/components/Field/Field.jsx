import React from 'react'
import styled, { css } from 'styled-components'
import Character from '../Character/Character';

const Text = styled.p`
  color: gray;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const GridField = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 15%;
  padding: 25px;
  background: gainsboro;

  &:hover {
    border: 1px solid black;
    cursor: pointer;

    ${Text} {
      color: black;
    }
  }
`;

const CharacterContainer = styled.div`
  ${props => !props.active ? css`
    display: none;
  ` : css`
    display: flex;
    align-items: center;
    justify-content: center;
  `};

  position: absolute;
  z-index: 5;
  margin: 0 auto;
  top: 0;
  width: 100%;

  &:hover {
    ${GridField} {
      border: 1px solid black;
      cursor: pointer;

      ${Text} {
        color: black;
      }
    }
  }
`;

const Field = ({ point, moveCharacterHandler, isCharacterOn = false }) => {
  // console.log(isCharacterOn);
  return (
  <Container>
    <GridField onClick={moveCharacterHandler}>
      <Text>{point[0]}</Text>
      <Text>{point[1]}</Text>
    </GridField>
    <CharacterContainer active={isCharacterOn}><Character /></CharacterContainer>
  </Container>
)};

export default Field;