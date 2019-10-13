import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import uuid4 from 'uuid';
import { connect } from 'react-redux';
import Field from '../Field/Field';
import Character from '../Character/Character';
import {
  togglePlayerActiveness, changeTeamsState, changeArenaState, incrementRound, changeActiveTeam, changePlayerPosition,
} from '../../redux/rootActions';
import { createGameState, replaceArrayItem } from '../../redux/helpers';
import {
  PAD_S, PAD_L, DESKTOP, DEFAULT,
} from '../../breakpoints';

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
  max-height: 370px;

  @media (min-width: ${DEFAULT}) {
    max-height: unset;
  }

  @media (min-width: ${PAD_S}) {
    width: 100%;
  }

  @media (min-width: ${PAD_L}) {
    height: 65vh;
    max-width: 750px;
    max-height: 650px;
  }

  @media (min-width: ${DESKTOP}) {
    max-width: 650px;
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

const Board = ({
  dispatchTogglePlayerActiveness, teamsState, dispatchChangeTeams, arenaState, dispatchChangeArena, dispatchIncrementRound, activeTeam, dispatchChangeActiveTeam, dispatchChangePlayerPosition,
}) => {
  const [fields, changeFields] = useState(null);
  const [arenaData, changeArenaData] = useState(null);
  const [teams, changePlayers] = useState(null);
  const [roundMoveCount, changeRoundMoveCount] = useState(0);
  const [roundActiveTeam, changeRoundActiveTeam] = useState(null);

  useEffect(() => {
    const { initialTeams, initialArena, initialFields } = createGameState(DIM);

    changeFields(initialFields);

    dispatchChangeTeams(initialTeams);
    dispatchChangeArena(initialArena);
    changeRoundActiveTeam(activeTeam);
  }, []);

  useEffect(() => {
    changePlayers(teamsState);
  }, [teamsState]);

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
  }, [roundMoveCount, dispatchIncrementRound]);

  const getActivePlayer = (players) => {
    const activePlayer = players.find((player) => player.active === true);

    return activePlayer;
  };

  const getMoveCharacterData = (fieldId) => {
    const activePlayer = getActivePlayer(teams);
    const targetPlayer = teams.find((player) => player.id === activePlayer.id);
    const targetArena = arenaData.find((foundArena) => foundArena.fieldId === fieldId);

    return { targetPlayer, targetArena };
  };

  const changeArenaFieldLocation = ({
    targetArena, targetPlayer, fieldId,
  }) => {
    // update arena
    const activePlayer = getActivePlayer(teams);
    const newArena = { ...targetArena, character: { present: true, team: activePlayer.team, uuid: activePlayer.id } };
    const prevArena = arenaData.find((foundArena) => foundArena.fieldId === targetPlayer.fieldId);
    const prevArenaIndex = arenaData.findIndex((foundArena) => foundArena.fieldId === targetPlayer.fieldId);

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

    const { targetArena, targetPlayer } = getMoveCharacterData(fieldId);
    const isFieldEmpty = !targetArena.character.present;

    dispatchChangePlayerPosition({ activePlayerId: activePlayer.id, targetPlayer, field });

    if (!isFieldEmpty) return;

    changeRoundMoveCount(roundMoveCount + 1);
    dispatchChangeActiveTeam();

    changeArenaFieldLocation({
      targetArena, targetPlayer, fieldId,
    });
  };

  const getMatchingArenaField = (point, arena) => {
    const matchingField = arena.find((field) => field.fieldId === point.id);

    return matchingField;
  };

  const togglePlayer = (field) => {
    const { uuid, team } = field.character;
    const activePlayer = getActivePlayer(teams);
    const isActivePlayerField = activePlayer ? activePlayer.fieldId === field.fieldId : false;

    if ((!activePlayer || isActivePlayerField) && team === activeTeam) {
      dispatchTogglePlayerActiveness(uuid);
    }
  };

  const getArenaGrid = (state) => state.map((point) => {
    const field = getMatchingArenaField(point, arenaData);
    const { present, uuid } = field.character;
    const foundPlayer = teams !== undefined ? teams.find((member) => member.id === uuid) : undefined;
    const isCharacterActive = present && foundPlayer !== undefined ? foundPlayer.active : false;
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

  const isBoardReady = fields && fields !== null && arenaData && arenaData !== null && arenaData.length > 0;

  return (
    <Container>
      <Fields xdim={DIM} ydim={DIM}>
        {isBoardReady && (
          getArenaGrid(fields)
        )}
      </Fields>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  teamsState: state.teamsState.teams,
  arenaState: state.arenaState.arena,
  activeTeam: state.gameState.activeTeam,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchTogglePlayerActiveness: (uuid) => dispatch(togglePlayerActiveness(uuid)),
  dispatchChangeTeams: (teams) => dispatch(changeTeamsState(teams)),
  dispatchChangeArena: (arena) => dispatch(changeArenaState(arena)),
  dispatchIncrementRound: () => dispatch(incrementRound()),
  dispatchChangeActiveTeam: () => dispatch(changeActiveTeam()),
  dispatchChangePlayerPosition: (params) => dispatch(changePlayerPosition(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board);
