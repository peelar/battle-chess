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

const checkBothCoordinates = (point, checked) => point[0] === checked[0] && point[1] === checked[1];

const sumBothCoordinates = (point, multiplier) => [point[0] + multiplier[0], point[1] + multiplier[1]];

export const isMoveInRange = (currentField, targetField) => {
  const conditions = [[-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1], [-1, -1], [0, -1], [1, -1]];
  const combinations = conditions.map((multiplier) => sumBothCoordinates(currentField, multiplier));

  let check = false;
  combinations.forEach((coordinate) => {
    const test = checkBothCoordinates(coordinate, targetField);
    if (test) check = true;
  });

  return check;
};

export default { };
