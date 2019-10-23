import React from "react";
import uuid4 from "uuid";
import styled, { css } from "styled-components";
import Field from "../Field/Field";
import Character from "../Character/Character";

const CharacterContainer = styled.div`
  ${props =>
    !props.active
      ? css`
          display: none;
        `
      : css`
          display: flex;
          align-items: center;
          justify-content: center;
        `};

  position: absolute;
  z-index: 5;
  margin: 0 auto;
  top: 0;
  width: 100%;
  bottom: 95px;
`;

const Unit = ({
  field,
  moveCharacterHandler,
  present,
  foundPlayer,
  isTeamActive,
  activeTeam,
  handleCharacterInteraction
}) => {
  const isCharacterActive =
    present && foundPlayer !== undefined ? foundPlayer.active : false;

  return (
    <Field
      field={field}
      moveCharacterHandler={() => moveCharacterHandler(field)}
      isFieldEmpty={!foundPlayer}
      key={uuid4()}
    >
      {foundPlayer && (
        <CharacterContainer active={present}>
          <Character
            inDanger={field.inDanger}
            character={foundPlayer}
            isCharacterActive={isCharacterActive}
            isTeamUnactive={!isTeamActive}
            isCharacterOn={present}
            interactWithCharacter={() =>
              handleCharacterInteraction({
                field,
                active: activeTeam,
                foundPlayer
              })}
          />
        </CharacterContainer>
      )}
    </Field>
  );
};

export default Unit;
