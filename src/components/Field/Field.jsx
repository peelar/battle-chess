import React from 'react'
import styled from 'styled-components'

const Text = styled.p`
  color: gray;
`;

const Container = styled.div`
  min-width: 7vw;
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
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
    background: whitesmoke;

    ${Text} {
      color: black;
    }
  }
`;

const Field = ({ point, moveCharacterHandler, children }) => (
  <Container>
    <GridField onClick={moveCharacterHandler}>
      <Text>{point[0]}</Text>
      <Text>{point[1]}</Text>
    </GridField>
    {children}
  </Container>
);

export default Field;