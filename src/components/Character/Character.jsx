import React from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import { faWalking } from "@fortawesome/free-solid-svg-icons";
import { GiBattleAxe } from "react-icons/gi";
// import { useSpring, animated } from "react-spring";

import SVG from "react-inlinesvg";
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
    props.health === "success" &&
    css`
      border-color: #32b67a;
    `};

  ${props =>
    props.health === "warning" &&
    css`
      border-color: #e88565;
    `};

  ${props =>
    props.health === "danger" &&
    css`
      border-color: #ef3e4a;
    `};

  ${props =>
    props.secondary &&
    css`
      background-color: white;
      color: black;
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
      border-color: #f0cf61;
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
        border-color: #ef3e4a;
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
  font-size: 1.05rem;
  align-items: center;

  @media (min-width: ${DEFAULT}) {
    grid-gap: 0.3rem;
  }
`;

const Attack = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #f0cf61;
`;

const Moves = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${props => (props.secondary ? "black" : "aliceblue")};
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  background-color: transparent;
`;

const Hero = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  svg {
    height: 70%;
    width: 70%;
    border-radius: 50%;
  }
`;

const getHealthLevel = ({ currentHp, maxHp }) => {
  const hpPercentage = parseFloat(currentHp / maxHp).toFixed(2);
  if (hpPercentage <= 0.34) return "danger";
  if (hpPercentage > 0.34 && hpPercentage <= 0.67) return "warning";
  if (hpPercentage > 0.67) return "success";
};

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

  const isDistanceCharacter = range !== 1;
  const heroPath = isDistanceCharacter
    ? "https://res.cloudinary.com/dbqh97mz3/image/upload/c_scale,w_250/v1572086062/Battle%20Chess/wizard.svg"
    : "https://res.cloudinary.com/dbqh97mz3/image/upload/c_scale,w_250/v1572086062/Battle%20Chess/knight.svg";
  const isSecondary = team === 1;

  const healthLevel = getHealthLevel({ currentHp, maxHp });
  const colors = {
    danger: "#ef3e4a",
    warning: "#e88565",
    success: "#32B67A"
  };

  // const animation = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <Dot
      secondary={isSecondary}
      active={isCharacterActive}
      fade={isTeamUnactive}
      shadow={isCharacterOn}
      inDanger={inDanger}
      health={healthLevel}
      onClick={() => interactWithCharacter(!isCharacterActive)}
      // style={animation}
    >
      {isCharacterActive ? (
        <Stats active={isCharacterActive}>
          <Info>
            <Attack>
              <GiBattleAxe />
              <span>{attack}</span>
            </Attack>
            <Moves secondary={isSecondary}>
              <FAIcon icon={faWalking} />
              <span>{moves}</span>
            </Moves>
          </Info>
        </Stats>
      ) : (
        <Hero>
          <Bar
            color={colors[healthLevel]}
            currentHp={currentHp}
            maxHp={maxHp}
          />
          <SVG src={heroPath} />
        </Hero>
      )}
      <Caption>{name}</Caption>
    </Dot>
  );
};

export default Character;
