import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import Field from '../Field/Field';
import uuid4 from 'uuid';
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
  grid-template-columns: ${props => props.xdim && `repeat(${props.xdim}, min-content)`};
  grid-template-rows: ${props => props.ydim && `repeat(${props.ydim}, min-content)`};
  grid-gap: 0.5rem;
  height: 55%;
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
  bottom: 95px;
`;

const createGameState = (dim) => {
  const x_team = [];
  const y_team = [];
  const populatedFields = [];
  const lastXCoordinate = dim - 1;

  for (let j = 0; j < dim; j++) {
    for (let i = 0; i < dim; i++) {
      if (j === 0) {
        const userId = uuid4();
        const fieldId = uuid4();
        x_team.push({id: userId, coordinates: [0, i], active: false, fieldId: fieldId});
        populatedFields.push({fieldId, point: [i, j], character: {present: true, uuid: userId, team: 0}});
      }

      else if (j === lastXCoordinate) {
        const userId = uuid4();
        const fieldId = uuid4();

        y_team.push({id: userId, coordinates: [lastXCoordinate, i], active: false, fieldId: fieldId});
        populatedFields.push({fieldId, point: [i, j], character: {present: true, uuid: userId, team: 1}});
      }

      else {
        const fieldId = uuid4();

        populatedFields.push({fieldId, point: [i, j], character: {present: false, uuid: null, team: null}});
      }
    }
  }


  return {initialTeams: [x_team, y_team], initialArena: [...populatedFields]};
}

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

  const toggleTeamMemberActiveness = (teamIndex, uuid) => {
    console.log(uuid);
    console.log('toggle');
    const allMembers = [...teams[0]].concat([...teams[1]]);
    const isAnyMemberActive = allMembers.find(member => member.active);

    const newTeam = [...teams[teamIndex]];
    const teamMemberIndex = newTeam.findIndex(member => member.id === uuid);
    const nextActiveValue = !newTeam[teamMemberIndex].active;
    newTeam[teamMemberIndex].active = nextActiveValue;

    if (isAnyMemberActive && nextActiveValue) return;

    const newTeams = replaceAt([...teams], teamIndex, newTeam);
    changeTeamMembers(newTeams);
    return newTeams;
  }

  const getActivePlayer = (players) => {
    const firstTeamPlayer = players[0].find(player => player.active === true);
    let team = 0;

    if (!firstTeamPlayer) {
      const secondTeamPlayer = players[1].find(player => player.active === true);
      team = 1;
      return {activePlayer: secondTeamPlayer, team}
    }

    return {activePlayer: firstTeamPlayer, team};
  }

  const getArenaGrid = (arenaState) => {
    return arenaState.map((field) => {
      const { present, uuid, team } = field.character;
      const foundTeamMember = teams[team] !== undefined ? teams[team].find(member => member.id === uuid) : undefined;
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
              toggleCharacterActive={() => toggleTeamMemberActiveness(team, uuid)} />
            </CharacterContainer>
        </Field>
      )
    })
  };

  const moveCharacterHandler = (fieldId) => {
    const { activePlayer, team } = getActivePlayer(teams);
    const targetField = arenaData.find(foundField => foundField.fieldId === fieldId);
    const isFieldEmpty = !targetField.character.present;

    if (!activePlayer) return;

    // update players
    const activePlayerIndex = teams[team].findIndex(player => player.id === activePlayer.id);
    const activePlayerField = teams[team].find(player => player.id === activePlayer.id).fieldId;
    const newActivePlayer = {...activePlayer, fieldId: isFieldEmpty ? fieldId : activePlayer.fieldId, active: false};

    const oldTeam = [...teams][team];
    const newTeam = replaceAt(oldTeam, activePlayerIndex, newActivePlayer);
    const newTeams = replaceAt([...teams], team, newTeam);
    changeTeamMembers(newTeams);
    if (!isFieldEmpty) return;

    // update arena
    const newField = {...targetField, character: { present: true, team: team, uuid: activePlayer.id }};
    const oldFieldIndex = arenaData.findIndex(foundField => foundField.fieldId === fieldId);

    const prevField = arenaData.find(foundField => foundField.fieldId === activePlayerField);
    const prevFieldIndex = arenaData.findIndex(foundField => foundField.fieldId === activePlayerField);

    const updatedPrevField = {...prevField, character: { present: false, team: null, uuid: null}};

    const newFieldArena = replaceAt([...arenaData], oldFieldIndex, newField);
    const updatedOldFieldArena = replaceAt([...newFieldArena], prevFieldIndex, updatedPrevField);
    changeArenaData(updatedOldFieldArena);
  };

  return (
    <Container>
      <Fields xdim={DIM} ydim={DIM}>
        {arenaData !== null && (
          getArenaGrid(arenaData)
        )}
      </Fields>
    </Container>
  )
}

export default Grid
