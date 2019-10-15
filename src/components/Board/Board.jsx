import React, { useState, useEffect } from 'react';
import uuid4 from 'uuid';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { getMatchingFieldsField, getActivePlayer, getMoveCharacterData } from '../../redux/helpers';
import Character from '../Character/Character';
import Field from '../Field/Field';
import {
  togglePlayerActiveness, changeTeamsState, changeFieldsState, incrementRound, changeActiveTeam, changePlayerPosition, changeFieldsPlayer, addGameEvent, attackPlayer, killPlayer,
} from '../../redux/rootActions';

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

const FieldsGrid = ({
  dispatchTogglePlayerActiveness, activeTeam, dispatchChangePlayerPosition, dispatchChangeActiveTeam, dispatchFieldsMove, teamsState, fieldsState, grid, dispatchIncrementRound, dispatchEvent, dispatchPlayerAttack, dispatchPlayerKill,
}) => {
  const [fields, changeFields] = useState(null);
  const [teams, changePlayers] = useState(null);
  const [roundMoveCount, changeRoundMoveCount] = useState(0);
  const [roundActiveTeam, changeRoundActiveTeam] = useState(null);

  useEffect(() => {
    changePlayers(teamsState);
  }, [teamsState]);

  useEffect(() => {
    changeFields(fieldsState);
  }, [fieldsState]);

  useEffect(() => {
    changeRoundActiveTeam(activeTeam);
  }, [activeTeam]);

  useEffect(() => {
    if (roundMoveCount === 2) {
      changeRoundMoveCount(0);
      dispatchIncrementRound();
    }
  }, [roundMoveCount, dispatchIncrementRound]);


  const isBoardReady = grid && grid !== null && fields && fields !== null && fields.length > 0;

  if (!isBoardReady) {
    return null;
  }

  const changeRound = () => {
    changeRoundMoveCount(roundMoveCount + 1);
    dispatchChangeActiveTeam();
  };

  const togglePlayer = (field) => {
    const { uuid, team } = field.character;
    const activePlayer = getActivePlayer(teams);
    const isActivePlayerField = activePlayer ? activePlayer.fieldId === field.fieldId : false;

    if ((!activePlayer || isActivePlayerField) && team === activeTeam) {
      dispatchTogglePlayerActiveness(uuid);
    }
  };

  const handlePlayerAttack = (foundPlayer) => {
    const activePlayer = getActivePlayer(teams);
    const { name, attack } = activePlayer.attributes;
    dispatchEvent({ text: `${name} attacks ${foundPlayer.attributes.name}!` });
    dispatchTogglePlayerActiveness(activePlayer.id);
    const isPlayerDead = foundPlayer.attributes.currentHp - attack <= 0;

    if (isPlayerDead) {
      dispatchPlayerKill({ id: foundPlayer.id });
      dispatchEvent({ text: `${name} killed ${foundPlayer.attributes.name} :(` });
    } else {
      dispatchPlayerAttack({ id: foundPlayer.id, damage: attack });
    }

    changeRound();
  };

  const handleCharacterInteraction = ({ field, active, foundPlayer }) => {
    const isActivePlayer = getActivePlayer(teams) !== undefined;
    const { team } = field.character;
    const isHostile = team !== active;

    if (isHostile && isActivePlayer) {
      handlePlayerAttack(foundPlayer);
    } else {
      togglePlayer(field);
    }
  };

  const moveCharacterHandler = (field) => {
    const { fieldId } = field;
    const activePlayer = getActivePlayer(teams);
    if (!activePlayer) return;

    const { targetField, targetPlayer, prevField } = getMoveCharacterData(teams, fields, fieldId);
    const isFieldEmpty = !targetField.character.present;

    dispatchChangePlayerPosition({ activePlayerId: activePlayer.id, targetPlayer, field });

    if (!isFieldEmpty) return;

    changeRound();

    // prev move
    dispatchFieldsMove({ targetId: targetPlayer.fieldId, targetField: { ...prevField }, updatedFieldState: { present: false, team: null, uuid: null } });
    // next move
    dispatchFieldsMove({ targetId: fieldId, targetField, updatedFieldState: { present: true, team: activePlayer.team, uuid: activePlayer.id } });

    const coordinatesText = `[${targetField.point[0]}, ${targetField.point[1]}]`;
    dispatchEvent({ text: `${activePlayer.attributes.name} moves to ${coordinatesText}` });
  };

  return grid.map((point) => {
    const field = getMatchingFieldsField(point, fields);
    const { present, uuid } = field.character;
    const foundPlayer = teams !== undefined ? teams.find((member) => member.id === uuid) : undefined;
    const isCharacterActive = present && foundPlayer !== undefined ? foundPlayer.active : false;
    const isTeamActive = roundActiveTeam === field.character.team;

    return (
      <Field
        point={field.point}
        moveCharacterHandler={() => moveCharacterHandler(field)}
        isFieldEmpty={!foundPlayer}
        key={uuid4()}
      >
        {foundPlayer && (
          <CharacterContainer active={present}>
            <Character
              character={foundPlayer}
              isCharacterActive={isCharacterActive}
              isTeamUnactive={!isTeamActive}
              isCharacterOn={present}
              interactWithCharacter={() => handleCharacterInteraction({ field, active: activeTeam, foundPlayer })}
            />
          </CharacterContainer>
        )}
      </Field>
    );
  });
};

const mapStateToProps = (state) => ({
  teamsState: state.teamsState.teams,
  fieldsState: state.fieldsState.fields,
  activeTeam: state.gameState.activeTeam,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchTogglePlayerActiveness: (uuid) => dispatch(togglePlayerActiveness(uuid)),
  dispatchChangeTeams: (teams) => dispatch(changeTeamsState(teams)),
  dispatchChangeFields: (field) => dispatch(changeFieldsState(field)),
  dispatchIncrementRound: () => dispatch(incrementRound()),
  dispatchChangeActiveTeam: () => dispatch(changeActiveTeam()),
  dispatchChangePlayerPosition: (params) => dispatch(changePlayerPosition(params)),
  dispatchFieldsMove: (params) => dispatch(changeFieldsPlayer(params)),
  dispatchEvent: (params) => dispatch(addGameEvent(params)),
  dispatchPlayerAttack: (params) => dispatch(attackPlayer(params)),
  dispatchPlayerKill: (params) => dispatch(killPlayer(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FieldsGrid);
