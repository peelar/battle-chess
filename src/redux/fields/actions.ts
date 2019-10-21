/* eslint-disable import/prefer-default-export */
import { fieldsActions } from "../rootTypes";
import { Field, Move } from "./interface";

export const changeFieldsState = (
  fields: Field[]
): { type: fieldsActions; payload: Field[] } => ({
  type: fieldsActions.changeFields,
  payload: [...fields]
});

export const handleMove = (
  params: Move
): { type: fieldsActions; payload: Move } => ({
  type: fieldsActions.handleMove,
  payload: {
    ...params
  }
});

// interface FieldsRange {
//   player: Player;
//   radiusFields: [];
// }

export const setFieldsInRange = params => ({
  type: fieldsActions.setFieldsInRange,
  payload: {
    ...params
  }
});

export const clearFieldsInRange = (): { type: fieldsActions } => ({
  type: fieldsActions.clearFieldsInRange
});
