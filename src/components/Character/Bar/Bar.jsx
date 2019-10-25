import React from "react";
import styled, { css } from "styled-components";
import uuid4 from "uuid";
import { DEFAULT, DESKTOP } from "../../../breakpoints";

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
  padding: 1.15vw;
  background-color: #c5beaa;
  border-radius: 50%;

  @media (min-width: ${DEFAULT}) {
    padding: 0.45rem;
  }

  @media (min-width: ${DESKTOP}) {
    padding: 0.3rem;
  }

  ${props =>
    props.full &&
    css`
      background-color: ${props.color};
    `}
`;

const Bar = ({ currentHp, maxHp, color }) => {
  const points = Array(maxHp).fill(0);
  const size = maxHp >= 4 ? "0.25" : "0.3";

  return (
    <HealthBar>
      {points.map((el, index) => (
        <Point
          key={uuid4()}
          size={size}
          full={index < currentHp}
          color={color}
        />
      ))}
    </HealthBar>
  );
};

export default Bar;
