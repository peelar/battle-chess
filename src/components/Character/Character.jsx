import React from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import { faCrosshairs, faStreetView } from "@fortawesome/free-solid-svg-icons";
import { DEFAULT, MOBILE_S, PAD_L, DESKTOP } from "../../breakpoints";
import Bar from "./Bar/Bar";

const Dot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  color: white;
  height: 5.5rem;
  width: 5.5rem;
  max-height: 45px;
  max-width: 45px;
  background-color: black;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  position: relative;
  border: 2px solid black;

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

  ${props =>
    props.secondary &&
    css`
      background-color: white;
      color: black;
    `};

  ${props =>
    props.tertiary &&
    css`
      border-color: orange;
    `};

  &:hover {
    ${props =>
      !props.active &&
      !props.fade &&
      css`
        border-color: gold;
      `};

    ${props =>
      props.fade &&
      css`
        filter: opacity(1);
      `};
  }

  ${props =>
    props.active &&
    css`
      border-color: goldenrod;
    `};

  ${props =>
    props.fade &&
    css`
      filter: opacity(0.25);
    `};

  ${props =>
    props.inDanger &&
    css`
      filter: opacity(0.75);

      &:hover {
        border-color: red;
      }
    `};
`;

const Caption = styled.p`
  display: flex;
  position: absolute;
  bottom: -3.5vh;
  margin: 0;
  padding: 0.25rem;
  font-weight: bold;
  color: black;
  font-size: 0.65rem;

  @media (min-width: ${MOBILE_S}) {
    font-size: 1rem;
  }

  @media (min-width: ${DEFAULT}) {
    font-size: initial;
  }
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: min-content min-content;
  grid-gap: 0.25rem;
  font-size: 0.95rem;
  align-items: center;
`;

const Attack = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: goldenrod;
`;

const Moves = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${props => (props.secondary ? "black" : "aliceblue")};
`;

const Character = ({
  character,
  isCharacterActive,
  interactWithCharacter,
  isCharacterOn,
  isTeamUnactive,
  inDanger
}) => {
  const { team } = character;
  const { name, maxHp, currentHp, attack, moves, range } = character.attributes;

  const isSecondary = team === 1;
  return (
    <Dot
      secondary={isSecondary}
      tertiary={range !== 1}
      active={isCharacterActive}
      fade={isTeamUnactive}
      shadow={isCharacterOn}
      inDanger={inDanger}
      onClick={() => interactWithCharacter(!isCharacterActive)}
    >
      <Bar currentHp={currentHp} maxHp={maxHp} />
      <Info>
        <Attack>
          <FAIcon icon={faCrosshairs} />
          <span>{attack}</span>
        </Attack>
        <Moves secondary={isSecondary}>
          <FAIcon icon={faStreetView} />
          <span>{moves}</span>
        </Moves>
      </Info>
      <Caption>{name}</Caption>
    </Dot>
  );
};

export default Character;
