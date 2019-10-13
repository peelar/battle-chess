import uuid4 from 'uuid';

export const createGameState = (dim) => {
  const xy_teams = [];
  const fields = [];
  const lastXCoordinate = dim - 1;
  const grid = [];

  for (let j = 0; j < dim; j += 1) {
    for (let i = 0; i < dim; i += 1) {
      if (j === 0) {
        const userId = uuid4();
        const fieldId = uuid4();

        xy_teams.push({
          id: userId, coordinates: [0, i], active: false, fieldId, team: 0,
        });
        fields.push({ fieldId, point: [i, j], character: { present: true, uuid: userId, team: 0 } });
        grid.push({ id: fieldId, point: [i, j] });
      } else if (j === lastXCoordinate) {
        const userId = uuid4();
        const fieldId = uuid4();

        xy_teams.push({
          id: userId, coordinates: [lastXCoordinate, i], active: false, fieldId, team: 1,
        });
        fields.push({ fieldId, point: [i, j], character: { present: true, uuid: userId, team: 1 } });
        grid.push({ id: fieldId, point: [i, j] });
      } else {
        const fieldId = uuid4();

        fields.push({ fieldId, point: [i, j], character: { present: false, uuid: null, team: null } });
        grid.push({ id: fieldId, point: [i, j] });
      }
    }
  }

  return { initialTeams: [...xy_teams], initialFields: [...fields], initialGrid: [...grid] };
};

export const replaceArrayItem = (array, index, item) => Object.assign([], array, { [index]: item });

export const getActivePlayer = (players) => {
  const activePlayer = players.find((player) => player.active === true);

  return activePlayer;
};


export const getMatchingFieldsField = (point, field) => {
  const matchingField = field.find((foundField) => foundField.fieldId === point.id);

  return matchingField;
};

export const getMoveCharacterData = (teamsArray, fieldsArray, fieldId) => {
  const activePlayer = getActivePlayer(teamsArray);

  const targetPlayer = teamsArray.find((player) => player.id === activePlayer.id);
  const targetField = fieldsArray.find((foundFields) => foundFields.fieldId === fieldId);
  const prevField = fieldsArray.find((foundFields) => foundFields.fieldId === targetPlayer.fieldId);

  return { targetPlayer, targetField, prevField };
};
export default createGameState;
