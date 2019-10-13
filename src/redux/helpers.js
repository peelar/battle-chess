import uuid4 from 'uuid';

const generatePlayer = ({
  userId, team, fieldId, coordinates,
}) => ({
  id: userId, coordinates: [...coordinates], fieldId, team, active: false,
});

const generateField = ({
  fieldId, coordinates, userId, team,
}) => ({ fieldId, point: [...coordinates], character: { present: userId !== null, uuid: userId, team } });

const generateGridPoint = ({ fieldId, coordinates }) => (
  { id: fieldId, point: [...coordinates] }
);

export const createGameState = (dim) => {
  const xy_teams = [];
  const fields = [];
  const lastXCoordinate = dim - 1;
  const grid = [];

  for (let j = 0; j < dim; j += 1) {
    for (let i = 0; i < dim; i += 1) {
      if (j === 0) {
        const fieldId = uuid4();
        const userId = uuid4();

        const player = generatePlayer({
          userId, team: 0, fieldId, coordinates: [0, i],
        });
        const field = generateField({
          fieldId, coordinates: [i, j], userId, team: 0,
        });
        const gridPoint = generateGridPoint({ fieldId, coordinates: [i, j] });

        xy_teams.push(player);
        fields.push(field);
        grid.push(gridPoint);
      } else if (j === lastXCoordinate) {
        const userId = uuid4();
        const fieldId = uuid4();

        const player = generatePlayer({
          userId, team: 1, fieldId, coordinates: [lastXCoordinate, i],
        });
        const field = generateField({
          fieldId, coordinates: [i, j], userId, team: 1,
        });
        const gridPoint = generateGridPoint({ fieldId, coordinates: [i, j] });

        xy_teams.push(player);
        fields.push(field);
        grid.push(gridPoint);
      } else {
        const fieldId = uuid4();

        const field = generateField({
          fieldId, coordinates: [i, j], userId: null, team: null,
        });
        const gridPoint = generateGridPoint({ fieldId, coordinates: [i, j] });

        fields.push(field);
        grid.push(gridPoint);
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
