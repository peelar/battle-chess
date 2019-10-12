import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import uuid4 from 'uuid';
import { connect } from 'react-redux';
import Field from '../Field/Field';
import Character from '../Character/Character';
import {
  toggleTeamMemberActiveness, changeTeamsState, changeFieldsState, changeArenaState, incrementRound, changeActiveTeam,
} from '../../redux/rootActions';
import { createGameState, replaceArrayItem } from '../../redux/helpers';
import { PAD_S } from '../../breakpoints';

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
  grid-template-columns: ${(props) => props.xdim && `repeat(${props.xdim}, 1fr)`};
  grid-template-rows: ${(props) => props.ydim && `repeat(${props.ydim}, 1fr)`};
  grid-gap: 0.5rem;
  max-width: 650px;
  height: 60vh;
  width: 95%;

  @media (min-width: ${PAD_S}) {
    width: 100%;
  }
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

const Grid = ({
  toggleTeamMember, teamsState, dispatchChangeTeams, fieldsState, dispatchChangeFields, arenaState, dispatchChangeArena, dispatchIncrementRound, activeTeam, dispatchChangeActiveTeam,
}) => {
  const [fields, changeFields] = useState(null);
  const [arenaData, changeArenaData] = useState(null);
  const [teams, changeTeamMembers] = useState(null);
  const [roundMoveCount, changeRoundMoveCount] = useState(0);
  const [roundActiveTeam, changeRoundActiveTeam] = useState(null);

  useEffect(() => {
    const { initialTeams, initialArena, initialFields } = createGameState(DIM);

    dispatchChangeTeams(initialTeams);
    dispatchChangeArena(initialArena);
    dispatchChangeFields(initialFields);
    changeRoundActiveTeam(activeTeam);
  }, []);

  useEffect(() => {
    changeTeamMembers(teamsState);
  }, [teamsState]);

  useEffect(() => {
    changeFields(fieldsState);
  }, [fieldsState]);

  useEffect(() => {
    changeArenaData(arenaState);
  }, [arenaState]);

  useEffect(() => {
    changeRoundActiveTeam(activeTeam);
  }, [activeTeam]);

  useEffect(() => {
    if (roundMoveCount === 2) {
      changeRoundMoveCount(0);
      dispatchIncrementRound();
    }
  }, [roundMoveCount]);

  const getActivePlayer = (players) => {
    const activePlayer = players.find((player) => player.active === true);

    return activePlayer;
  };

  const changeTeamMemberLocation = ({ activePlayer, targetTeamMember, field }) => {
    const index = teams.findIndex((player) => player.id === activePlayer.id);
    const newTeamMember = {
      ...targetTeamMember, active: false, fieldId: field.fieldId, coordinates: [...field.point],
    };
    const newTeamsState = replaceArrayItem([...teams], index, newTeamMember);
    dispatchChangeTeams(newTeamsState);
  };

  const getMoveCharacterData = (fieldId) => {
    const activePlayer = getActivePlayer(teams);
    const targetTeamMember = teams.find((player) => player.id === activePlayer.id);
    const targetArena = arenaData.find((foundArena) => foundArena.fieldId === fieldId);

    return { targetTeamMember, targetArena };
  };

  const changeArenaFieldLocation = ({
    targetArena, targetTeamMember, fieldId,
  }) => {
    // update arena
    const activePlayer = getActivePlayer(teams);
    const newArena = { ...targetArena, character: { present: true, team: activePlayer.team, uuid: activePlayer.id } };
    const prevArena = arenaData.find((foundArena) => foundArena.fieldId === targetTeamMember.fieldId);
    const prevArenaIndex = arenaData.findIndex((foundArena) => foundArena.fieldId === targetTeamMember.fieldId);

    const nextFieldIndex = arenaData.findIndex((foundArena) => foundArena.fieldId === fieldId);
    const newArenaState = replaceArrayItem([...arenaData], nextFieldIndex, newArena);

    const updatedPrevArena = { ...prevArena, character: { present: false, team: null, uuid: null } };
    const updatedOldFieldArena = replaceArrayItem(newArenaState, prevArenaIndex, updatedPrevArena);

    dispatchChangeArena(updatedOldFieldArena);
  };

  const moveCharacterHandler = (field) => {
    const { fieldId } = field;
    const activePlayer = getActivePlayer(teams);
    if (!activePlayer) return;

    const { targetArena, targetTeamMember } = getMoveCharacterData(fieldId);
    const isFieldEmpty = !targetArena.character.present;

    changeTeamMemberLocation({ activePlayer, targetTeamMember, field });

    if (!isFieldEmpty) return;

    changeRoundMoveCount(roundMoveCount + 1);
    dispatchChangeActiveTeam();

    changeArenaFieldLocation({
      targetArena, targetTeamMember, fieldId,
    });
  };

  const getMatchingArenaField = (point, arena) => {
    const matchingField = arena.find((field) => field.fieldId === point.id);

    return matchingField;
  };

  const togglePlayer = (field) => {
    const { uuid, team } = field.character;
    const activePlayer = getActivePlayer(teams);

    if (!activePlayer && team === activeTeam) {
      toggleTeamMember(uuid);
    }
  };

  const getArenaGrid = (state) => state.map((point) => {
    const field = getMatchingArenaField(point, arenaData);
    const { present, uuid } = field.character;
    const foundTeamMember = teams !== undefined ? teams.find((member) => member.id === uuid) : undefined;
    const isCharacterActive = present && foundTeamMember !== undefined ? foundTeamMember.active : false;
    const isTeamActive = roundActiveTeam === field.character.team;

    return (
      <Field
        point={field.point}
        moveCharacterHandler={() => moveCharacterHandler(field)}
        key={uuid4()}
      >
        <CharacterContainer active={present}>
          <Character
            character={field.character}
            isCharacterActive={isCharacterActive}
            isTeamUnactive={!isTeamActive}
            isCharacterOn={present}
            toggleCharacterActive={() => togglePlayer(field)}
          />
        </CharacterContainer>
      </Field>
    );
  });

  return (
    <Container>
      <Fields xdim={DIM} ydim={DIM}>
        {fields !== null && arenaData !== null && (
          getArenaGrid(fields)
        )}
      </Fields>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  teamsState: state.charactersState.teams,
  fieldsState: state.fieldsState.fields,
  arenaState: state.arenaState.arena,
  activeTeam: state.gameState.activeTeam,
});

const mapDispatchToProps = (dispatch) => ({
  toggleTeamMember: (uuid) => dispatch(toggleTeamMemberActiveness(uuid)),
  dispatchChangeTeams: (teams) => dispatch(changeTeamsState(teams)),
  dispatchChangeFields: (fields) => dispatch(changeFieldsState(fields)),
  dispatchChangeArena: (arena) => dispatch(changeArenaState(arena)),
  dispatchIncrementRound: () => dispatch(incrementRound()),
  dispatchChangeActiveTeam: () => dispatch(changeActiveTeam()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Grid);
