import uuid4 from 'uuid';

export const createGameState = (dim) => {
  const xy_teams = [];
  const arena = [];
  const lastXCoordinate = dim - 1;
  const fields = [];

  for (let j = 0; j < dim; j += 1) {
    for (let i = 0; i < dim; i += 1) {
      if (j === 0) {
        const userId = uuid4();
        const fieldId = uuid4();

        xy_teams.push({
          id: userId, coordinates: [0, i], active: false, fieldId, team: 0,
        });
        arena.push({ fieldId, point: [i, j], character: { present: true, uuid: userId, team: 0 } });
        fields.push({ id: fieldId, point: [i, j] });
      } else if (j === lastXCoordinate) {
        const userId = uuid4();
        const fieldId = uuid4();

        xy_teams.push({
          id: userId, coordinates: [lastXCoordinate, i], active: false, fieldId, team: 1,
        });
        arena.push({ fieldId, point: [i, j], character: { present: true, uuid: userId, team: 1 } });
        fields.push({ id: fieldId, point: [i, j] });
      } else {
        const fieldId = uuid4();

        arena.push({ fieldId, point: [i, j], character: { present: false, uuid: null, team: null } });
        fields.push({ id: fieldId, point: [i, j] });
      }
    }
  }

  return { initialTeams: [...xy_teams], initialArena: [...arena], initialFields: [...fields] };
};

export const replaceArrayItem = (array, index, item) => Object.assign([], array, { [index]: item });

export default createGameState;
