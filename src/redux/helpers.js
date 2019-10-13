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
export default { };
