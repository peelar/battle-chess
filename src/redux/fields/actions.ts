/* eslint-disable import/prefer-default-export */
import { fieldsActions } from "../rootTypes";
import { Field, Move } from "./interface";

export const changeFieldsState = (
  fields: Field[]
): { type: fieldsActions; fields: Field[] } => ({
  type: fieldsActions.changeFields,
  fields: [...fields]
});

export const handleMove = (
  params: Move
): { type: fieldsActions; move: Move } => ({
  type: fieldsActions.handleMove,
  move: {
    ...params
  }
});

// interface FieldsRange {
//   player: Player;
//   radiusFields: [];
// }

export const setFieldsInRange = params => ({
  type: fieldsActions.setFieldsInRange,
  range: {
    ...params
  }
});

export const clearFieldsInRange = (): { type: fieldsActions } => ({
  type: fieldsActions.clearFieldsInRange
});
