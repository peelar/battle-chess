import React from 'react';
import styled, { css } from 'styled-components';
import uuid4 from 'uuid';

const HealthBar = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
`;

const Point = styled.li`
  border: 1px solid black;
  padding: 0.4rem;
  background-color: gray;

  ${(props) => props.full && css`
    background-color: gold;
  `}
`;


const Bar = ({ currentHp = 3, maxHp = 4 }) => {
  const points = Array(maxHp).fill(0);
  return (
    <HealthBar>
      {points.map((el, index) => <Point key={uuid4()} full={index < currentHp} />)}
    </HealthBar>
  );
};

export default Bar;
