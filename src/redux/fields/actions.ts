/* eslint-disable import/prefer-default-export */
import { fieldsActions } from "../rootTypes";
import { Field, Move, Range } from "./interface";

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

export const setFieldsInRange = (
  params: Range
): { type: fieldsActions; range: Range } => ({
  type: fieldsActions.setFieldsInRange,
  range: {
    ...params
  }
});

export const clearFieldsInRange = (): { type: fieldsActions } => ({
  type: fieldsActions.clearFieldsInRange
});
