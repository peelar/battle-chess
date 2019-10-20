const RANGE = [[-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1], [-1, -1], [0, -1], [1, -1]];

const generateRangeMultiplier = (radius) => {
  const rangeMultiplier = [];
  for (let i = 1; i < radius + 1; i += 1) {
    const newRange = [...RANGE].map((pair) => pair.map((num) => num * i));
    rangeMultiplier.push(newRange);
  }

  return rangeMultiplier;
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

export const checkBothCoordinates = (point, checked) => point[0] === checked[0] && point[1] === checked[1];

const sumBothCoordinates = (point, multiplier) => [point[0] + multiplier[0], point[1] + multiplier[1]];

export const getFieldsInRange = (currentField, moveRadius = 1) => {
  const radiusRange = generateRangeMultiplier(moveRadius);
  const combinations = radiusRange.map((range) => range.map((multiplier) => sumBothCoordinates(currentField, multiplier)));

  return combinations;
};

export const isMoveInRange = (currentField, targetField, moveRadius = 1) => {
  const fields = getFieldsInRange(currentField, moveRadius).flat();

  let check = false;
  fields.forEach((coordinate) => {
    const test = checkBothCoordinates(coordinate, targetField);
    if (test) check = true;
  });

  return check;
};

export default { };
