import React from "react";
import styled, { css } from "styled-components";

const Text = styled.p`
  color: darkgray;
`;

const Container = styled.div`
  height: 100%;
  position: relative;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
`;

const GridField = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 15%;
  height: 100%;
  background-color: gainsboro;
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
    background-color: whitesmoke;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    ${Text} {
      color: black;
    }
  }

  ${props =>
    props.inRange &&
    css`
      background-color: ivory;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

      &:hover {
        background-color: #f0cf61;
      }
    `}

  ${props =>
    props.inAttackRange &&
    css`
      background-color: ivory;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

      &:hover {
        background-color: #f0cf61;
      }
    `}

  ${props =>
    props.inDanger &&
    css`
      background-color: #ef3e4a;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

      &:hover {
        background-color: #ef3e4a;
      }
    `}
`;

const Field = ({ field, moveCharacterHandler, children, isFieldEmpty }) => {
  const { point, inRange, inDanger, inAttackRange } = field;
  return (
    <Container>
      <GridField
        onClick={moveCharacterHandler}
        inRange={inRange}
        inDanger={inDanger}
        inAttackRange={inAttackRange}
      >
        {isFieldEmpty && (
          <>
            <Text>{point[0]}</Text>
            <Text>{point[1]}</Text>
          </>
        )}
      </GridField>
      {children}
    </Container>
  );
};

export default Field;
