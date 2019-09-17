import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import uuid4 from 'uuid';
import Field from '../Field/Field';
import Character from '../Character/Character';

const DIM = 6;

const Container = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  background: gray;
  filter: opacity(0.8);
  height: 100vh;
`;

const Fields = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.xdim && `repeat(${props.xdim}, min-content)`};
  grid-template-rows: ${(props) => props.ydim && `repeat(${props.ydim}, min-content)`};
  grid-gap: 0.5rem;
`;

const CharacterContainer = styled.div`
  ${(props) => (!props.active ? css`
    display: none;
  ` : css`
    display: flex;
    align-items: center;
    justify-content: center;
  `)};

  position: absolute;
  z-index: 5;
  margin: 0 auto;
  top: 0;
  width: 100%;
  bottom: 95px;
`;

const createGameState = (dim) => {
  const xy_teams = [];
  const populatedFields = [];
  const lastXCoordinate = dim - 1;

  for (let j = 0; j < dim; j += 1) {
    for (let i = 0; i < dim; i += 1) {
      if (j === 0) {
        const userId = uuid4();
        const fieldId = uuid4();

        xy_teams.push({
          id: userId, coordinates: [0, i], active: false, fieldId, team: 0,
        });
        populatedFields.push({ fieldId, point: [i, j], character: { present: true, uuid: userId, team: 0 } });
      } else if (j === lastXCoordinate) {
        const userId = uuid4();
        const fieldId = uuid4();

        xy_teams.push({
          id: userId, coordinates: [lastXCoordinate, i], active: false, fieldId, team: 1,
        });
        populatedFields.push({ fieldId, point: [i, j], character: { present: true, uuid: userId, team: 1 } });
      } else {
        const fieldId = uuid4();

        populatedFields.push({ fieldId, point: [i, j], character: { present: false, uuid: null, team: null } });
      }
    }
  }

  return { initialTeams: [...xy_teams], initialArena: [...populatedFields] };
};

function replaceAt(array, index, value) {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
}

const Grid = () => {
  const [arenaData, changeArenaData] = useState(null);
  const [teams, changeTeamMembers] = useState(null);

  useEffect(() => {
    const { initialTeams, initialArena } = createGameState(DIM);
    changeTeamMembers(initialTeams);
    changeArenaData(initialArena);
  }, []);

  useEffect(() => {
    if (teams) {
      console.log(teams);
    }
  }, [teams]);

  const toggleTeamMemberActiveness = (uuid) => {
    const teamsState = [...teams];
    const teamMemberIndex = teamsState.findIndex((member) => member.id === uuid);
    const nextActiveValue = !teamsState[teamMemberIndex].active;
    teamsState[teamMemberIndex].active = nextActiveValue;

    changeTeamMembers(teamsState);
  };

  const getActivePlayer = (players) => {
    const activePlayer = players.find((player) => player.active === true);

    return activePlayer;
  };

  const moveCharacterHandler = (fieldId) => {
    const activePlayer = getActivePlayer(teams);
    const targetField = arenaData.find((foundField) => foundField.fieldId === fieldId);
    const isFieldEmpty = !targetField.character.present;

    if (!activePlayer) return;

    // update players
    const activePlayerField = teams.find((player) => player.id === activePlayer.id).fieldId;
    const newTeamsState = [...teams.filter((player) => player.id !== activePlayer.id), { ...activePlayerField }];
    changeTeamMembers(newTeamsState);

    if (!isFieldEmpty) return;

    // update arena
    const newField = { ...targetField, character: { present: true, team: activePlayer.team, uuid: activePlayer.id } };
    const oldFieldIndex = arenaData.findIndex((foundField) => foundField.fieldId === fieldId);

    const prevField = arenaData.find((foundField) => foundField.fieldId === activePlayerField);
    const prevFieldIndex = arenaData.findIndex((foundField) => foundField.fieldId === activePlayerField);

    const updatedPrevField = { ...prevField, character: { present: false, team: null, uuid: null } };

    const newFieldArena = replaceAt([...arenaData], oldFieldIndex, newField);
    const updatedOldFieldArena = replaceAt([...newFieldArena], prevFieldIndex, updatedPrevField);
    changeArenaData(updatedOldFieldArena);
  };

  const getArenaGrid = (arenaState) => arenaState.map((field) => {
    const { present, uuid, team } = field.character;
    const foundTeamMember = teams !== undefined ? teams.find((member) => member.id === uuid) : undefined;
    const isCharacterActive = present && foundTeamMember !== undefined ? foundTeamMember.active : false;

    return (
      <Field
        point={field.point}
        moveCharacterHandler={() => moveCharacterHandler(field.fieldId, team)}
        key={uuid4()}
      >
        <CharacterContainer active={present}>
          <Character
            character={field.character}
            isCharacterActive={isCharacterActive}
            isCharacterOn={present}
            toggleCharacterActive={() => toggleTeamMemberActiveness(uuid)}
          />
        </CharacterContainer>
      </Field>
    );
  });

  return (
    <Container>
      <Fields xdim={DIM} ydim={DIM}>
        {arenaData !== null && (
          getArenaGrid(arenaData)
        )}
      </Fields>
    </Container>
  );
};

export default Grid;
