import React from "react";
import styled, { css } from "styled-components";
import uuid4 from "uuid";

const HealthBar = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
  position: absolute;
  bottom: -0.25vh;
`;

const Point = styled.li`
  border: 1px solid black;
  padding: 0.3rem;
  background-color: #c5beaa;
  border-radius: 50%;

  ${props =>
    props.full &&
    css`
      background-color: ${props.color};
    `}
`;

const Bar = ({ currentHp, maxHp, color }) => {
  const points = Array(maxHp).fill(0);
  return (
    <HealthBar>
      {points.map((el, index) => (
        <Point key={uuid4()} full={index < currentHp} color={color} />
      ))}
    </HealthBar>
  );
};

export default Bar;
