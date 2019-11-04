import { Field } from "./fields/interface";
import { Player, PlayerAttributes } from "./teams/interface";
import GameGenerator from "./gameGenerator";
import * as icons from "../assets/assets";

const RANGE = [
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [-1, -1],
  [0, -1],
  [1, -1]
];

const generateRangeMultiplier = (radius: number): any[] => {
  const rangeMultiplier: any[] = [];
  for (let i = 1; i < radius + 1; i += 1) {
    const newRange = [...RANGE].map(pair => pair.map(num => num * i));
    rangeMultiplier.push(newRange);
  }

  return rangeMultiplier;
};

export const checkBothTeamsAlive = (teams: Player[]) => {
  return (
    teams.filter(el => el.team === 0).length > 0 &&
    teams.filter(el => el.team === 1).length > 0
  );
};

export const replaceArrayItem = (array, index, item): [] =>
  Object.assign([], array, { [index]: item });

export const getActivePlayer = (players): Player => {
  const activePlayer = players.find(player => player.active === true);

  return activePlayer;
};

export const getMatchingFieldsField = (point, field): Field => {
  const matchingField = field.find(
    foundField => foundField.fieldId === point.id
  );

  return matchingField;
};

export const getMoveCharacterData = (
  teamsArray: Player[],
  fieldsArray: Field[],
  fieldId: number
): { targetPlayer?: Player; targetField?: Field; prevField?: Field } => {
  const activePlayer = getActivePlayer(teamsArray);

  const targetPlayer: any = teamsArray.find(
    player => player.id === activePlayer.id
  );
  const targetField = fieldsArray.find(
    foundFields => foundFields.fieldId === fieldId
  );
  const prevField = fieldsArray.find(
    foundFields => foundFields.fieldId === targetPlayer.fieldId
  );

  return { targetPlayer, targetField, prevField };
};

export const checkBothCoordinates = (
  point: number[],
  checked: number[]
): boolean => point[0] === checked[0] && point[1] === checked[1];

const sumBothCoordinates = (
  point: number[],
  multiplier: number[]
): number[] => [point[0] + multiplier[0], point[1] + multiplier[1]];

export const getFieldsInRange = (
  currentField: number[],
  moveRadius = 1
): any[][] => {
  const radiusRange = generateRangeMultiplier(moveRadius);
  const combinations = radiusRange.map(range =>
    range.map((multiplier: number[]) =>
      sumBothCoordinates(currentField, multiplier)
    )
  );

  return combinations;
};

export const isMoveInRange = (
  currentField: number[],
  targetField: number[],
  moveRadius = 1
): boolean => {
  const fields = getFieldsInRange(currentField, moveRadius).flat();

  let check = false;
  fields.forEach(coordinate => {
    const test = checkBothCoordinates(coordinate, targetField);
    if (test) check = true;
  });

  return check;
};

export const initializeGame = (DIM: number) => {
  const generator = new GameGenerator(DIM, 5, 4);
  generator.createGameState();

  return generator;
};

const characterTests = {
  wizard: attributes => attributes.range > 1,
  spartan: attributes => attributes.range > 2
};

const testCharacterRole = (attributes: PlayerAttributes) => {
  const tests = Object.keys(characterTests).map(test => {
    const isValid = characterTests[test];
    return { role: test, valid: isValid(attributes) };
  });

  const character = tests.find(test => test.valid === true);
  const role = character ? character.role : "knight";

  return role;
};

export const getCharacterRole = (attributes: PlayerAttributes) => {
  const role = testCharacterRole(attributes);
  const heroPath = icons[role];

  return heroPath;
};

export default {};
