import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import uuid4 from 'uuid';
import {
  getMatchingFieldsField, getActivePlayer, getMoveCharacterData, isMoveInRange, getFieldsInRange,
} from '../../redux/helpers';
import Unit from '../Unit/Unit';
import {
  togglePlayerActiveness, changeTeamsState, changeFieldsState, incrementRound, changeActiveTeam, changePlayerPosition, handleMove, addGameEvent, attackPlayer, killPlayer, setFieldsInRange, clearFieldsInRange,
} from '../../redux/rootActions';

const FieldsGrid = ({
  dispatchTogglePlayerActiveness, activeTeam, dispatchChangePlayerPosition, dispatchChangeActiveTeam, dispatchFieldsMove, teamsState, fieldsState, grid, dispatchIncrementRound, dispatchEvent, dispatchPlayerAttack, dispatchPlayerKill, dispatchShowRangeFields, dispatchClearFieldsInRange,
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
    const fieldsInRange = getFieldsInRange(field.point);

    if ((!activePlayer || isActivePlayerField) && team === activeTeam) {
      dispatchTogglePlayerActiveness(uuid);
      dispatchShowRangeFields({
        player: teams.find((el) => el.id === uuid),
        fields: fieldsInRange,
      });
    }
  };

  const handlePlayerAttack = (foundPlayer) => {
    const activePlayer = getActivePlayer(teams);
    const { name, attack } = activePlayer.attributes;
    if (!isMoveInRange(activePlayer.coordinates, foundPlayer.coordinates)) return;

    dispatchEvent({ text: `${name} attacks ${foundPlayer.attributes.name}!` });
    dispatchTogglePlayerActiveness(activePlayer.id);
    const isPlayerDead = foundPlayer.attributes.currentHp - attack <= 0;

    if (isPlayerDead) {
      dispatchPlayerKill({ player: foundPlayer });
      dispatchEvent({ text: `${name} killed ${foundPlayer.attributes.name} :(` });
    } else {
      dispatchPlayerAttack({ victimId: foundPlayer.id, attackerId: activePlayer.id, damage: attack });
    }

    dispatchClearFieldsInRange();
    changeRound();
  };

  const handleCharacterInteraction = ({ field, active, foundPlayer }) => {
    const activePlayer = getActivePlayer(teams);
    const isActivePlayer = activePlayer !== undefined;
    const gotMoves = isActivePlayer ? activePlayer.attributes.moves > 0 : false;

    const { team } = field.character;
    const isHostile = team !== active;

    if (isHostile && isActivePlayer && gotMoves) {
      handlePlayerAttack(foundPlayer);
    } else {
      togglePlayer(field);
    }
  };

  const moveCharacterHandler = (field) => {
    const { fieldId } = field;
    const activePlayer = getActivePlayer(teams);
    if (!activePlayer) return;

    const gotMoves = activePlayer.attributes.moves > 0;
    if (!gotMoves) return;

    const { targetField, targetPlayer, prevField } = getMoveCharacterData(teams, fields, fieldId);
    const isFieldTaken = targetField.character.present;

    if (isFieldTaken) return;
    if (!isMoveInRange(activePlayer.coordinates, field.point)) {
      dispatchTogglePlayerActiveness(activePlayer.id);
      dispatchClearFieldsInRange();
      return;
    }

    dispatchChangePlayerPosition({ activePlayerId: activePlayer.id, targetPlayer, field });
    changeRound();

    // prev move
    dispatchFieldsMove({ targetId: targetPlayer.fieldId, targetField: { ...prevField }, updatedFieldState: { present: false, team: null, uuid: null } });
    // next move
    dispatchFieldsMove({ targetId: fieldId, targetField, updatedFieldState: { present: true, team: activePlayer.team, uuid: activePlayer.id } });

    dispatchTogglePlayerActiveness(activePlayer.id);
    dispatchClearFieldsInRange();

    const coordinatesText = `[${targetField.point[0]}, ${targetField.point[1]}]`;
    dispatchEvent({ text: `${activePlayer.attributes.name} moves to ${coordinatesText}` });
  };

  return grid.map((point) => {
    const field = getMatchingFieldsField(point, fields);
    const { present, uuid } = field.character;
    const foundPlayer = teams !== undefined ? teams.find((member) => member.id === uuid) : undefined;
    const isTeamActive = roundActiveTeam === field.character.team;

    return (
      <Unit key={uuid4()} field={field} moveCharacterHandler={moveCharacterHandler} present={present} foundPlayer={foundPlayer} isTeamActive={isTeamActive} activeTeam={activeTeam} handleCharacterInteraction={handleCharacterInteraction} />
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
  dispatchFieldsMove: (params) => dispatch(handleMove(params)),
  dispatchEvent: (params) => dispatch(addGameEvent(params)),
  dispatchPlayerAttack: (params) => dispatch(attackPlayer(params)),
  dispatchPlayerKill: (params) => dispatch(killPlayer(params)),
  dispatchShowRangeFields: (params) => dispatch(setFieldsInRange(params)),
  dispatchClearFieldsInRange: () => dispatch(clearFieldsInRange()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FieldsGrid);
